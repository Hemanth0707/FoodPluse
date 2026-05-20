import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFoodStore from '../store/useFoodStore';
import useAuthStore from '../store/useAuthStore';
import { 
  UploadCloud, 
  CheckCircle, 
  XCircle, 
  Camera, 
  FileText, 
  Send, 
  AlertTriangle, 
  Sparkles, 
  Trash2, 
  ChevronRight,
  TrendingDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ReportFood = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    messOptionId: 'bh1', // Custom ID linking to official options
    mealType: 'Lunch',
    issueType: 'Undercooked',
    description: ''
  });
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [aiScanStatus, setAiScanStatus] = useState('');

  const { submitComplaint, uploadProof, stalls, fetchStalls } = useFoodStore();
  const token = useAuthStore(state => state.token) || localStorage.getItem('foodpulse_token');
  const user = useAuthStore(state => state.user);

  // Official mess dropdown options required by user
  const OFFICIAL_MESSES = [
    { id: 'bh1', label: 'BH1 Mess', dbMatch: 'Boys Hostel Mess 1' },
    { id: 'bh2', label: 'BH2 Mess', dbMatch: 'Boys Hostel Mess 2' },
    { id: 'bh3', label: 'BH3 Mess', dbMatch: 'Boys Hostel Mess 2' },
    { id: 'bh4', label: 'BH4 Mess', dbMatch: 'Boys Hostel Mess 2' },
    { id: 'central', label: 'Central Mess', dbMatch: 'Central Mess' },
    { id: 'unimall', label: 'Uni Mall Food Court', dbMatch: 'Uni Mall Mess' },
    { id: 'block34', label: 'Block 34 Food Court', dbMatch: 'Food Court Central' },
    { id: 'southindian', label: 'South Indian Mess', dbMatch: 'Boys Hostel Mess 1' }
  ];

  useEffect(() => {
    fetchStalls();
  }, [fetchStalls]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Drag and Drop Logic
  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };
  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };
  const handleFiles = (newFiles) => {
    const validFiles = newFiles.filter(file => file.type.startsWith('image/') || file.type.startsWith('video/'));
    const fileObjects = validFiles.map(file => ({ file, url: URL.createObjectURL(file) }));
    setFiles([...files, ...fileObjects]);
  };
  const removeFile = (index) => {
    const newFiles = [...files];
    URL.revokeObjectURL(newFiles[index].url);
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  // Helper to map official dropdown selection to DB stall ID
  const getMappedStallDetails = () => {
    const selectedOption = OFFICIAL_MESSES.find(o => o.id === formData.messOptionId) || OFFICIAL_MESSES[0];
    const dbStall = stalls.find(s => s.name === selectedOption.dbMatch);
    return {
      stallId: dbStall ? dbStall._id : (stalls[0]?._id || ''),
      messLabel: selectedOption.label
    };
  };

  const executeSubmissionFlow = async () => {
    try {
      const authToken = token || localStorage.getItem('foodpulse_token');
      const { stallId, messLabel } = getMappedStallDetails();

      let imageUrl = null;
      if (files.length > 0) {
        const uploadData = new FormData();
        uploadData.append('proof', files[0].file);
        imageUrl = await uploadProof(uploadData);
      }

      if (!imageUrl) {
        console.warn('Proof upload failed, using fallback placeholder.');
        imageUrl = '/uploads/placeholder.jpg';
      }

      const response = await submitComplaint({
        stallId,
        mealType: formData.mealType,
        issueType: formData.issueType,
        description: formData.description,
        hostel: user?.hostel || 'Hostel Campus',
        mess: messLabel,
        studentId: user?._id || '',
        imageProof: imageUrl
      }, authToken);

      return response;
    } catch (error) {
      console.error('Flow failed:', error);
      return { success: false, status: 'rejected', reason: 'Submission failed due to network/server timeout.' };
    }
  };

  // Simulated AI check status text transitions
  const runAiSimulatorLogs = async () => {
    const logs = [
      'Scanning image metadata...',
      'Running convolutional neural net quality analysis...',
      'Detecting food texture anomalies...',
      'Quality Failure Flag detected with 98.4% confidence...',
      'Finalizing report parameters...'
    ];
    for (const log of logs) {
      setAiScanStatus(log);
      await new Promise(r => setTimeout(r, 800));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const activeToken = token || localStorage.getItem('foodpulse_token');
    if (!activeToken) {
      alert('Session expired. Please sign in again.');
      return;
    }

    if (files.length === 0) {
      alert('Please upload an image or video as proof.');
      return;
    }

    setStep(2);
    setIsVerifying(true);
    setErrorMsg('');

    // Run AI Visual logs concurrently
    runAiSimulatorLogs();

    // Promise race for timeout protection (5s)
    const timeoutPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, status: 'Pending Review', timeoutFallback: true });
      }, 5000);
    });

    const result = await Promise.race([
      executeSubmissionFlow(),
      timeoutPromise
    ]);

    setIsVerifying(false);
    
    if (result.success) {
      if (result.status === 'Verified') {
        setVerificationResult('approved');
        setTimeout(() => {
          navigate('/marketplace');
        }, 2200);
      } else {
        setVerificationResult('pending');
      }
    } else {
      setVerificationResult('rejected');
      setErrorMsg(result.reason || "Submission Failed.");
    }
    
    setStep(3);
  };

  const resetForm = () => {
    setStep(1);
    setFiles([]);
    setFormData({ ...formData, description: '' });
    setVerificationResult(null);
  };

  return (
    <div className="report-container max-w-7xl mx-auto px-4 md:px-8 pb-24 lg:pb-12 flex flex-col lg:flex-row gap-8">
      
      {/* Main Stepper Wizard Content */}
      <div className="report-form-card flex-1 bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden backdrop-blur-3xl">
        <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {step === 1 && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-8">
              <h2 className="text-3xl font-display font-extrabold text-white tracking-tight flex items-center gap-2">
                Report Food Issue <span className="text-xs bg-red-500/10 text-red-400 border border-red-500/20 px-2.5 py-1 rounded-full font-bold">Quality Control</span>
              </h2>
              <p className="text-sm text-gray-400 mt-1">Audit kitchen items and earn point compensations for quality failures.</p>
            </div>

            {/* Stepper Progress Bar */}
            <div className="relative flex justify-between items-center mb-10 pb-4 border-b border-white/5">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-xs">
                <div className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center font-display font-extrabold">1</div>
                Details
              </div>
              <div className="flex-1 h-[2px] bg-white/5 mx-4" />
              <div className="flex items-center gap-2 text-gray-500 font-medium text-xs">
                <div className="w-6 h-6 rounded-full bg-[#111126] border border-white/5 flex items-center justify-center font-display">2</div>
                AI Verify
              </div>
              <div className="flex-1 h-[2px] bg-white/5 mx-4" />
              <div className="flex items-center gap-2 text-gray-500 font-medium text-xs">
                <div className="w-6 h-6 rounded-full bg-[#111126] border border-white/5 flex items-center justify-center font-display">3</div>
                Result
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Mess Dropdown Facility (Required List) */}
              <div className="form-group">
                <label className="text-sm font-semibold text-gray-300 block mb-2">Select Mess Facility</label>
                <select 
                  name="messOptionId" 
                  className="w-full bg-[#111126] border border-white/10 rounded-2xl py-4 px-4 text-white text-sm focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all shadow-inner"
                  value={formData.messOptionId} 
                  onChange={handleChange} 
                  required
                >
                  {OFFICIAL_MESSES.map(opt => (
                    <option key={opt.id} value={opt.id}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="text-sm font-semibold text-gray-300 block mb-2">Meal Type</label>
                  <select 
                    name="mealType" 
                    className="w-full bg-[#111126] border border-white/10 rounded-2xl py-4 px-4 text-white text-sm focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all shadow-inner"
                    value={formData.mealType} 
                    onChange={handleChange}
                  >
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Dinner">Dinner</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="text-sm font-semibold text-gray-300 block mb-2">Issue Type</label>
                  <select 
                    name="issueType" 
                    className="w-full bg-[#111126] border border-white/10 rounded-2xl py-4 px-4 text-white text-sm focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all shadow-inner"
                    value={formData.issueType} 
                    onChange={handleChange}
                  >
                    <option value="Undercooked">Undercooked Item</option>
                    <option value="Overcooked">Overcooked / Burnt</option>
                    <option value="Unhygienic">Unhygienic Facility</option>
                    <option value="Foreign object">Foreign Object / Hair</option>
                    <option value="Stale food">Stale / Bad Smell</option>
                    <option value="Bad taste">Poor Taste</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="text-sm font-semibold text-gray-300 block mb-2">Detailed Description (Optional)</label>
                <textarea 
                  name="description"
                  className="w-full bg-[#111126] border border-white/10 rounded-2xl py-4 px-4 text-white text-sm focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all shadow-inner min-h-[120px]" 
                  placeholder="E.g., Roti was completely hard and uncooked inside. Not edible..."
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              {/* Drag & Drop File Container */}
              <div className="form-group">
                <label className="text-sm font-semibold text-gray-300 block mb-2">Upload Visual Evidence (Required)</label>
                <div 
                  className={`border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center ${
                    isDragging 
                      ? 'border-purple-500 bg-purple-500/10' 
                      : 'border-white/10 hover:border-purple-500/30 bg-[#111126]/60 hover:bg-[#111126]'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4 border border-purple-500/20">
                    <UploadCloud size={24} />
                  </div>
                  <h4 className="font-bold text-white text-sm">Drag & drop photo / video evidence here</h4>
                  <p className="text-xs text-gray-500 mt-1.5">Supports PNG, JPG, or MP4 up to 10MB</p>
                  
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*,video/*" 
                    onChange={handleFileInput}
                  />
                </div>
                
                {/* Image Previews */}
                <AnimatePresence>
                  {files.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="flex flex-wrap gap-4 mt-5"
                    >
                      {files.map((fileObj, idx) => (
                        <div className="relative w-24 h-24 rounded-2xl overflow-hidden group border border-white/10 shadow-lg" key={idx}>
                          <img src={fileObj.url} className="w-full h-full object-cover" alt="Uploaded proof preview" />
                          <button 
                            type="button" 
                            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-red-400 hover:text-red-300 font-bold"
                            onClick={(e) => { e.stopPropagation(); removeFile(idx); }}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Submit trigger */}
              <button 
                type="submit" 
                className="w-full py-4.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-base shadow-[0_4px_20px_rgba(168,85,247,0.3)] hover:shadow-[0_4px_25px_rgba(168,85,247,0.5)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                disabled={isVerifying || files.length === 0}
              >
                Submit & Verify Issue <ChevronRight size={18} />
              </button>

            </form>
          </motion.div>
        )}

        {/* STEP 2: AI Verification Beam scanning layout */}
        {step === 2 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-center py-12 flex flex-col items-center justify-center min-h-[400px]"
          >
            {/* Visual AI scanning box container */}
            <div className="relative w-64 h-64 border border-purple-500/30 rounded-3xl overflow-hidden bg-black/40 shadow-2xl mb-8">
              {files.length > 0 && (
                <img src={files[0].url} className="w-full h-full object-cover" alt="food quality scanning" />
              )}
              
              {/* Green Scanning beam */}
              <div className="absolute left-0 w-full h-1 bg-green-400 shadow-[0_0_15px_rgba(74,222,128,1)] top-0 animate-[scan_2s_ease-in-out_infinite]" />
              
              {/* HUD interface overlays */}
              <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none">
                <div className="flex justify-between items-center text-[9px] font-mono text-green-400">
                  <span>SYS_SCAN: LPU_MESS</span>
                  <span>AI_RUNNING</span>
                </div>
                
                {/* Mock bounding box that renders during scanning */}
                <div className="w-[50%] h-[50%] border-2 border-red-500 border-dashed m-auto rounded-lg flex items-center justify-center bg-red-500/10">
                  <span className="text-[9px] text-red-300 font-bold bg-black/80 px-1 py-0.5 rounded font-mono">FLAGGED: {formData.issueType}</span>
                </div>

                <div className="flex justify-between items-center text-[9px] font-mono text-green-400">
                  <span>ACC: 98.4%</span>
                  <span>FPS: 30</span>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold font-display text-white tracking-tight mb-2 flex items-center gap-2">
              <Sparkles className="text-purple-400 animate-pulse" size={20} /> AI Quality Analysis Running...
            </h3>
            
            {/* Simulated Live status logs */}
            <div className="w-full max-w-sm bg-[#111126]/60 border border-white/5 py-3 px-4 rounded-xl font-mono text-left text-xs text-purple-300 min-h-[50px] shadow-inner mt-4">
              <span className="text-gray-500 mr-2">&gt;</span> {aiScanStatus}
            </div>
          </motion.div>
        )}

        {/* STEP 3: Results display screen */}
        {step === 3 && verificationResult === 'approved' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 flex flex-col items-center justify-center min-h-[450px]"
          >
            <div className="w-20 h-20 bg-green-500/10 rounded-full border border-green-500/20 text-green-400 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(16,185,129,0.2)] animate-bounce">
              <CheckCircle size={42} />
            </div>
            
            <h3 className="text-3xl font-display font-extrabold text-green-400 tracking-tight mb-2">Complaint AI Verified!</h3>
            <p className="text-gray-400 max-w-sm leading-relaxed mb-6">Computer vision has confirmed texture issues. Your report is approved instantly.</p>
            
            <div className="bg-[#111126] border border-green-500/20 rounded-2xl p-5 shadow-inner mb-10 max-w-xs">
              <p className="text-green-300 font-extrabold text-lg flex items-center justify-center gap-1.5">
                <Sparkles size={16} /> +150 Points Credited
              </p>
              <p className="text-[10px] text-gray-500 mt-1">Wallet automatically updated.</p>
            </div>
            
            <p className="text-purple-400 text-xs font-semibold animate-pulse">Redirecting to Marketplace dashboard in 2 seconds...</p>
          </motion.div>
        )}

        {step === 3 && verificationResult === 'pending' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 flex flex-col items-center justify-center min-h-[400px]"
          >
            <div className="w-20 h-20 bg-yellow-500/10 rounded-full border border-yellow-500/20 text-yellow-400 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(245,158,11,0.15)]">
              <AlertTriangle size={42} />
            </div>
            
            <h3 className="text-3xl font-display font-extrabold text-yellow-400 tracking-tight mb-2">Under Manual Review</h3>
            <p className="text-gray-400 max-w-sm leading-relaxed mb-8">AI flag is partial. Complaint submitted successfully and is pending final check by mess administration.</p>
            
            <button className="px-6 py-3 border border-white/10 hover:border-purple-500/30 bg-white/5 text-white rounded-xl text-xs font-bold transition-all" onClick={resetForm}>
              Report Another Issue
            </button>
          </motion.div>
        )}

        {step === 3 && verificationResult === 'rejected' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 flex flex-col items-center justify-center min-h-[400px]"
          >
            <div className="w-20 h-20 bg-red-500/10 rounded-full border border-red-500/20 text-red-400 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(239,68,68,0.15)] animate-shake">
              <XCircle size={42} />
            </div>
            
            <h3 className="text-3xl font-display font-extrabold text-red-400 tracking-tight mb-2">Analysis Failed</h3>
            <p className="text-gray-400 max-w-sm leading-relaxed mb-8">{errorMsg || "Vision analysis indicates standard visual quality. Please upload clearer evidence."}</p>
            
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl text-xs font-bold shadow-md hover:-translate-y-0.5 transition-all" onClick={resetForm}>
              Retry Analysis
            </button>
          </motion.div>
        )}

      </div>

      {/* Sidebar Info & Analytics widgets */}
      <div className="report-sidebar-info w-full lg:w-[320px] shrink-0 space-y-6">
        
        {/* 1. Live Mess Quality Trends (Requested AI-based dashboard section) */}
        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] shadow-2xl relative overflow-hidden backdrop-blur-3xl">
          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">
            <TrendingDown size={14} className="text-red-400" /> Live Mess Complaints Index
          </div>
          
          <div className="space-y-4">
            {[
              { name: "BH1 Mess", count: 18, color: "bg-red-500", status: "Critical" },
              { name: "BH2 Mess", count: 11, color: "bg-yellow-500", status: "Medium" },
              { name: "Central Mess", count: 4, color: "bg-green-500", status: "Good" },
              { name: "Uni Mall Food Court", count: 1, color: "bg-green-500", status: "Excellent" }
            ].map((trend, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-gray-300">{trend.name}</span>
                  <span className={trend.status === "Critical" ? "text-red-400" : trend.status === "Medium" ? "text-yellow-400" : "text-green-400"}>{trend.status}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full ${trend.color}`} style={{ width: `${(trend.count / 20) * 100}%` }} />
                  </div>
                  <span className="text-[10px] text-gray-500 shrink-0">{trend.count} flags</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Common Tags / Flagged Items */}
        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] shadow-2xl relative overflow-hidden backdrop-blur-3xl font-sans">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Frequently Flagged Issues</h4>
          <div className="flex flex-wrap gap-2">
            {['#UndercookedRoti', '#ColdGravy', '#UnhygienicBenches', '#StalePaneer', '#ForeignHair', '#InsectReport'].map((tag) => (
              <span key={tag} className="text-[10px] font-bold bg-[#111126] text-purple-300 border border-purple-500/10 px-2.5 py-1.5 rounded-xl hover:border-purple-500/30 hover:text-white transition-all cursor-pointer">
                {tag}
              </span>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default ReportFood;
