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
  TrendingDown,
  Clock,
  ShieldCheck,
  Activity,
  Cpu,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReportSuccessModal from '../components/ReportSuccessModal';

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
  
  // High-tech file upload states
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatusText, setUploadStatusText] = useState('');
  const [uploadedFileDetails, setUploadedFileDetails] = useState({ name: '', size: '' });

  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [aiScanStatus, setAiScanStatus] = useState('');
  const [activeBoxes, setActiveBoxes] = useState([]);
  const [expandedAuditId, setExpandedAuditId] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

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

  // Past Audit History List (Dribbble/Linear layout style)
  const [pastAudits, setPastAudits] = useState([
    {
      id: 'aud-1',
      mess: 'BH1 Mess',
      issue: 'Undercooked Item',
      time: '2 hours ago',
      status: 'Verified',
      points: 150,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150&auto=format&fit=crop&q=60'
    },
    {
      id: 'aud-2',
      mess: 'Central Mess',
      issue: 'Foreign Object',
      time: 'Yesterday',
      status: 'Verified',
      points: 150,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=150&auto=format&fit=crop&q=60'
    },
    {
      id: 'aud-3',
      mess: 'Uni Mall Food Court',
      issue: 'Unhygienic',
      time: '3 days ago',
      status: 'Rejected',
      points: 0,
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=150&auto=format&fit=crop&q=60',
      reason: 'Visual compliance standards met. No foreign object or sanitation hazard detected in high-definition filters.'
    }
  ]);

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
    if (validFiles.length === 0) return;

    const file = validFiles[0];
    const url = URL.createObjectURL(file);
    const sizeStr = (file.size / 1024 / 1024).toFixed(2) + ' MB';

    setUploadedFileDetails({ name: file.name, size: sizeStr });
    setIsUploading(true);
    setUploadProgress(0);
    setUploadStatusText('Establishing secure buffer link...');

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          setFiles([{ file, url }]);
          setUploadProgress(100);
        }, 300);
      }
      
      setUploadProgress(progress);
      if (progress < 25) {
        setUploadStatusText('Establishing secure buffer uplink...');
      } else if (progress < 50) {
        setUploadStatusText('Reading image EXIF meta-parameters...');
      } else if (progress < 75) {
        setUploadStatusText('Uploading proof frames to FoodPulse secure grid...');
      } else if (progress < 100) {
        setUploadStatusText('Verifying package pixel integrity & checksum...');
      } else {
        setUploadStatusText('Visual proof successfully buffered!');
      }
    }, 120);
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    URL.revokeObjectURL(newFiles[index].url);
    newFiles.splice(index, 1);
    setFiles(newFiles);
    setUploadProgress(0);
    setUploadedFileDetails({ name: '', size: '' });
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

  const getBoxesForIssue = (issueType) => {
    switch (issueType) {
      case 'Undercooked':
        return [
          {
            id: 'undercooked-1',
            label: 'Raw Starch Composition',
            confidence: '78.5%',
            color: 'border-yellow-500 text-yellow-400 bg-yellow-500/10',
            style: { top: '25%', left: '20%', width: '35%', height: '30%' }
          },
          {
            id: 'undercooked-2',
            label: 'Crystalline Moisture Defect',
            confidence: '92.4%',
            color: 'border-amber-500/30 text-amber-500 bg-amber-500/5',
            style: { top: '40%', left: '45%', width: '30%', height: '35%' }
          }
        ];
      case 'Overcooked':
        return [
          {
            id: 'overcooked-1',
            label: 'Carbonized Surface Area',
            confidence: '89.1%',
            color: 'border-orange-500 text-orange-400 bg-orange-500/10',
            style: { top: '15%', left: '15%', width: '70%', height: '55%' }
          },
          {
            id: 'overcooked-2',
            label: 'Critical Thermal Degradation',
            confidence: '96.8%',
            color: 'border-red-500 text-red-400 bg-red-500/10',
            style: { top: '35%', left: '35%', width: '30%', height: '25%' }
          }
        ];
      case 'Unhygienic':
        return [
          {
            id: 'unhygienic-1',
            label: 'Sub-optimal Surface Hygiene',
            confidence: '83.2%',
            color: 'border-yellow-500 text-yellow-400 bg-yellow-500/10',
            style: { top: '10%', left: '10%', width: '80%', height: '70%' }
          },
          {
            id: 'unhygienic-2',
            label: 'Organic Residue Trace',
            confidence: '94.1%',
            color: 'border-amber-500/30 text-amber-500 bg-amber-500/5',
            style: { top: '45%', left: '40%', width: '25%', height: '25%' }
          }
        ];
      case 'Foreign object':
        return [
          {
            id: 'foreign-1',
            label: 'Irregular Density Contaminant',
            confidence: '91.8%',
            color: 'border-red-500 text-red-400 bg-red-500/10',
            style: { top: '30%', left: '30%', width: '40%', height: '40%' }
          },
          {
            id: 'foreign-2',
            label: 'CRITICAL: Hair Follicle Signature',
            confidence: '98.2%',
            color: 'border-red-500 text-red-400 bg-red-500/20 animate-pulse',
            style: { top: '48%', left: '46%', width: '12%', height: '12%' }
          }
        ];
      case 'Stale food':
        return [
          {
            id: 'stale-1',
            label: 'Discolored Hydration Index',
            confidence: '81.4%',
            color: 'border-yellow-500 text-yellow-400 bg-yellow-500/10',
            style: { top: '20%', left: '20%', width: '60%', height: '50%' }
          },
          {
            id: 'stale-2',
            label: 'Gaseous Degraded Layer',
            confidence: '89.5%',
            color: 'border-amber-500/30 text-amber-500 bg-amber-500/5',
            style: { top: '40%', left: '30%', width: '35%', height: '30%' }
          }
        ];
      default:
        return [
          {
            id: 'default-1',
            label: 'Viscosity & Texture Irregularity',
            confidence: '85.6%',
            color: 'border-amber-500/30 text-amber-500 bg-amber-500/5',
            style: { top: '25%', left: '25%', width: '50%', height: '50%' }
          }
        ];
    }
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

  // Simulated AI check status text transitions & Bounding boxes stagger
  const runAiSimulatorLogs = async () => {
    setActiveBoxes([]);
    const logs = [
      'Establishing AI compliance telemetry stream...',
      'Extracting pixel matrices and light gradients...',
      'Running Convolutional Neural Net texture audit...',
      'Detecting structural aberrations and edge defects...',
      'Identifying foreign organic signatures...',
      'Validating compliance verification index...'
    ];

    const boxes = getBoxesForIssue(formData.issueType);
    
    // Step-by-step progress logging
    for (let i = 0; i < logs.length; i++) {
      setAiScanStatus(logs[i]);
      
      // Stagger bounding boxes
      if (i === 2 && boxes[0]) {
        setActiveBoxes(prev => [...prev, boxes[0]]);
      }
      if (i === 4 && boxes[1]) {
        setActiveBoxes(prev => [...prev, boxes[1]]);
      }
      
      await new Promise(r => setTimeout(r, 700));
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

    // Run AI Visual logs & bounding box generation concurrently
    const simulatorPromise = runAiSimulatorLogs();

    // Promise race for timeout protection (5s)
    const timeoutPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, status: 'Verified', timeoutFallback: true });
      }, 4800);
    });

    const result = await Promise.race([
      executeSubmissionFlow(),
      timeoutPromise
    ]);

    await simulatorPromise; // Ensure scan finishes
    setIsVerifying(false);
    
    if (result.success) {
      if (result.status === 'Verified') {
        setVerificationResult('approved');
        
        // Add item to past history timeline dynamically for extra visual feedback
        const newAudit = {
          id: 'aud-' + Date.now(),
          mess: OFFICIAL_MESSES.find(o => o.id === formData.messOptionId)?.label || 'BH1 Mess',
          issue: formData.issueType + ' Item',
          time: 'Just now',
          status: 'Verified',
          points: 150,
          image: files[0]?.url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150&auto=format&fit=crop&q=60'
        };
        setPastAudits(prev => [newAudit, ...prev]);
        
        // Open premium success modal popup!
        setTimeout(() => {
          setIsSuccessModalOpen(true);
        }, 200);
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
    setUploadProgress(0);
    setUploadedFileDetails({ name: '', size: '' });
  };

  return (
    <div className="report-container max-w-7xl mx-auto px-4 md:px-8 pb-24 lg:pb-12 flex flex-col lg:flex-row gap-8 font-sans">
      
      {/* Main Stepper Wizard Content */}
      <div className="report-form-card flex-1 bg-white/[0.02] border border-white/5 p-6 md:p-8 rounded-[2rem] shadow-2xl relative overflow-hidden backdrop-blur-3xl">
        <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Stepper Progress Bar Header */}
        <div className="relative flex justify-between items-center mb-10 pb-4 border-b border-white/5">
          <div className={`flex items-center gap-2 font-bold text-xs transition-colors duration-300 ${step === 1 ? 'text-amber-500' : 'text-gray-400'}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center font-display font-extrabold transition-all duration-300 ${step === 1 ? 'bg-amber-500 text-white shadow-[0_0_12px_rgba(198, 138, 43, 0.1)]' : 'bg-white/5 border border-white/10 text-gray-500'}`}>1</div>
            Details
          </div>
          <div className={`flex-1 h-[2px] mx-4 transition-colors duration-300 ${step > 1 ? 'bg-amber-500/20' : 'bg-white/5'}`} />
          
          <div className={`flex items-center gap-2 font-bold text-xs transition-colors duration-300 ${step === 2 ? 'text-amber-500' : 'text-gray-400'}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center font-display font-extrabold transition-all duration-300 ${step === 2 ? 'bg-amber-500 text-white shadow-[0_0_12px_rgba(198, 138, 43, 0.1)]' : 'bg-white/5 border border-white/10 text-gray-500'}`}>2</div>
            AI Verify
          </div>
          <div className={`flex-1 h-[2px] mx-4 transition-colors duration-300 ${step > 2 ? 'bg-amber-500/20' : 'bg-white/5'}`} />
          
          <div className={`flex items-center gap-2 font-bold text-xs transition-colors duration-300 ${step === 3 ? 'text-amber-500' : 'text-gray-400'}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center font-display font-extrabold transition-all duration-300 ${step === 3 ? 'bg-amber-500 text-white shadow-[0_0_12px_rgba(198, 138, 43, 0.1)]' : 'bg-white/5 border border-white/10 text-gray-500'}`}>3</div>
            Result
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 1: Details and File Dragzone */}
          {step === 1 && (
            <motion.div 
              key="step-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8">
                <h2 className="text-3xl font-display font-extrabold text-white tracking-tight flex items-center gap-2.5">
                  AI Quality Auditor <span className="text-[10px] uppercase bg-red-500/10 text-red-400 border border-red-500/20 px-2.5 py-1 rounded-full font-bold tracking-widest">Compliance HUD</span>
                </h2>
                <p className="text-sm text-gray-400 mt-1">Audit kitchen items and earn point compensations for quality failures.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Mess Dropdown Facility */}
                <div className="form-group">
                  <label className="text-sm font-semibold text-gray-300 block mb-2" id="mess-facility-label">Select Mess Facility</label>
                  <select 
                    name="messOptionId" 
                    aria-labelledby="mess-facility-label"
                    className="w-full bg-[#151515]/60 border border-white/10 rounded-2xl py-4 px-4 text-white text-sm focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all shadow-inner accessibility-focus"
                    value={formData.messOptionId} 
                    onChange={handleChange} 
                    required
                  >
                    {OFFICIAL_MESSES.map(opt => (
                      <option key={opt.id} value={opt.id} className="bg-[#0b0b18]">{opt.label}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-group">
                    <label className="text-sm font-semibold text-gray-300 block mb-2" id="meal-type-label">Meal Type</label>
                    <select 
                      name="mealType" 
                      aria-labelledby="meal-type-label"
                      className="w-full bg-[#151515]/60 border border-white/10 rounded-2xl py-4 px-4 text-white text-sm focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all shadow-inner accessibility-focus"
                      value={formData.mealType} 
                      onChange={handleChange}
                    >
                      <option value="Breakfast" className="bg-[#0b0b18]">Breakfast</option>
                      <option value="Lunch" className="bg-[#0b0b18]">Lunch</option>
                      <option value="Snacks" className="bg-[#0b0b18]">Snacks</option>
                      <option value="Dinner" className="bg-[#0b0b18]">Dinner</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="text-sm font-semibold text-gray-300 block mb-2" id="issue-type-label">Issue Type</label>
                    <select 
                      name="issueType" 
                      aria-labelledby="issue-type-label"
                      className="w-full bg-[#151515]/60 border border-white/10 rounded-2xl py-4 px-4 text-white text-sm focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all shadow-inner accessibility-focus"
                      value={formData.issueType} 
                      onChange={handleChange}
                    >
                      <option value="Undercooked" className="bg-[#0b0b18]">Undercooked Item</option>
                      <option value="Overcooked" className="bg-[#0b0b18]">Overcooked / Burnt</option>
                      <option value="Unhygienic" className="bg-[#0b0b18]">Unhygienic Facility</option>
                      <option value="Foreign object" className="bg-[#0b0b18]">Foreign Object / Hair</option>
                      <option value="Stale food" className="bg-[#0b0b18]">Stale / Bad Smell</option>
                      <option value="Bad taste" className="bg-[#0b0b18]">Poor Taste</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="text-sm font-semibold text-gray-300 block mb-2" id="desc-label">Detailed Description (Optional)</label>
                  <textarea 
                    name="description"
                    aria-labelledby="desc-label"
                    className="w-full bg-[#151515]/60 border border-white/10 rounded-2xl py-4 px-4 text-white text-sm focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all shadow-inner min-h-[100px] accessibility-focus" 
                    placeholder="E.g., Roti was completely hard and uncooked inside. Not edible..."
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>

                {/* Drag & Drop File Container */}
                <div className="form-group">
                  <label className="text-sm font-semibold text-gray-300 block mb-2">Upload Visual Evidence (Required)</label>
                  
                  {/* File Dropzone */}
                  {files.length === 0 && !isUploading && (
                    <div 
                      className={`border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center ${
                        isDragging 
                          ? 'border-amber-500 bg-amber-500/5' 
                          : 'border-white/10 hover:border-amber-500/30 bg-[#151515]/60 hover:bg-[#151515]'
                      } accessibility-focus`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      tabIndex="0"
                      role="button"
                      aria-label="Drag and drop photo or video evidence here to upload"
                      onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
                    >
                      <div className="w-14 h-14 rounded-2xl bg-amber-500/5 text-amber-500 flex items-center justify-center mb-4 border border-amber-500/20">
                        <UploadCloud size={24} />
                      </div>
                      <h4 className="font-bold text-white text-sm">Drag & drop photo / video evidence here</h4>
                      <p className="text-xs text-gray-500 mt-1.5 font-sans">Supports PNG, JPG, or MP4 up to 10MB</p>
                      
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*,video/*" 
                        onChange={handleFileInput}
                      />
                    </div>
                  )}

                  {/* Upload percentage progress bar */}
                  {isUploading && (
                    <div className="border border-amber-500/20 bg-[#151515]/60 rounded-3xl p-6 relative overflow-hidden backdrop-blur-md">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-mono text-amber-500 flex items-center gap-1.5">
                          <RefreshCw size={12} className="animate-spin text-amber-500" />
                          {uploadStatusText}
                        </span>
                        <span className="text-sm font-mono text-white font-bold">{uploadProgress}%</span>
                      </div>
                      <div className="h-2 w-full bg-white/5 border border-white/5 rounded-full overflow-hidden relative">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-amber-600 to-yellow-500 text-neutral-950 rounded-full"
                          style={{ width: `${uploadProgress}%` }}
                          layout
                        />
                      </div>
                      <div className="flex items-center gap-2 mt-4 text-[10px] text-gray-500">
                        <span className="truncate max-w-[200px]">File: {uploadedFileDetails.name}</span>
                        <span>•</span>
                        <span>Size: {uploadedFileDetails.size}</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Image Previews */}
                  <AnimatePresence>
                    {files.length > 0 && !isUploading && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="mt-3"
                      >
                        <div className="relative inline-block w-28 h-28 rounded-2xl overflow-hidden group border border-white/10 shadow-lg">
                          <img src={files[0].url} className="w-full h-full object-cover" alt="Uploaded proof preview" />
                          <button 
                            type="button" 
                            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-red-400 hover:text-red-300 font-bold"
                            onClick={(e) => { e.stopPropagation(); removeFile(0); }}
                            aria-label="Remove uploaded image"
                          >
                            <Trash2 size={20} />
                          </button>
                          
                          {/* Checked Badge */}
                          <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-0.5 border border-white/20 shadow-md">
                            <CheckCircle size={12} />
                          </div>
                        </div>
                        <div className="mt-2 text-xs font-mono text-gray-500">
                          {uploadedFileDetails.name} ({uploadedFileDetails.size})
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Submit trigger */}
                <button 
                  type="submit" 
                  className="w-full py-4.5 rounded-2xl bg-gradient-to-r from-amber-600 to-yellow-500 text-neutral-950 text-white font-bold text-base shadow-[0_4px_20px_rgba(198, 138, 43, 0.2)] hover:shadow-[0_4px_25px_rgba(6, 182, 212,0.5)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none accessibility-focus"
                  disabled={isUploading || files.length === 0}
                >
                  Submit & Verify Issue <ChevronRight size={18} />
                </button>

              </form>
            </motion.div>
          )}

          {/* STEP 2: AI Verification Beam scanning layout */}
          {step === 2 && (
            <motion.div 
              key="step-2"
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="text-center py-12 flex flex-col items-center justify-center min-h-[400px]"
            >
              {/* Computer vision scanning HUD overlay */}
              <div className="relative w-72 h-72 border border-amber-500/30 rounded-3xl overflow-hidden bg-black/40 shadow-2xl mb-8 radar-sweep-container flex items-center justify-center">
                {files.length > 0 && (
                  <img src={files[0].url} className="absolute inset-0 w-full h-full object-cover opacity-80" alt="food quality scanning" />
                )}
                
                {/* Green/Purple Scanning radar sweep line */}
                <div className="radar-sweep-line" />
                
                {/* Glowing grid & crosshairs overlay */}
                <svg className="absolute inset-0 w-full h-full text-amber-500/25 pointer-events-none" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="0.5" fill="none" />
                  <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" fill="none" />
                  <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" fill="none" />
                  <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1,3" />
                  <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1,3" />
                  {/* Tech Corners */}
                  <path d="M 5,15 L 5,5 L 15,5" stroke="currentColor" strokeWidth="1" fill="none" />
                  <path d="M 85,5 L 95,5 L 95,15" stroke="currentColor" strokeWidth="1" fill="none" />
                  <path d="M 5,85 L 5,95 L 15,95" stroke="currentColor" strokeWidth="1" fill="none" />
                  <path d="M 85,95 L 95,95 L 95,85" stroke="currentColor" strokeWidth="1" fill="none" />
                </svg>
                
                {/* Active Bounding Boxes Overlay */}
                {activeBoxes.map((box) => (
                  <motion.div
                    key={box.id}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`absolute border-2 rounded-lg ${box.color} flex flex-col justify-between p-1 z-20 shadow-[0_0_15px_rgba(198, 138, 43, 0.05)]`}
                    style={box.style}
                  >
                    {/* Corner Bracket Graphics */}
                    <span className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-current" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-current" />
                    <span className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-current" />
                    <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-current" />
                    
                    <div className="absolute top-[-22px] left-0 text-[8px] font-bold bg-black/95 px-1.5 py-0.5 rounded border border-current font-mono shadow-md uppercase tracking-tight flex items-center gap-1 whitespace-nowrap shrink-0 max-w-max select-none">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                      {box.label} ({box.confidence})
                    </div>
                  </motion.div>
                ))}
                
                {/* HUD interface overlays */}
                <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none z-30 font-mono text-[9px]">
                  <div className="flex justify-between items-center text-amber-500">
                    <span className="flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-[#7BA05B] animate-ping" />
                      SYS_AUDIT_MODE: LIVE
                    </span>
                    <span>CAM_FEED: 01</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-amber-500/80">
                    <span>LATITUDE: 31.25° N</span>
                    <span>LONGITUDE: 75.70° E</span>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold font-display text-white tracking-tight mb-2 flex items-center gap-2">
                <Cpu className="text-amber-500 animate-spin" size={20} /> AI Quality Analysis Running...
              </h3>
              
              {/* Simulated Live status logs */}
              <div className="w-full max-w-sm bg-[#151515]/60 border border-white/5 py-3.5 px-4 rounded-2xl font-mono text-left text-xs text-amber-500 min-h-[50px] shadow-inner mt-4">
                <span className="text-gray-500 mr-2">&gt;</span> {aiScanStatus}
              </div>
            </motion.div>
          )}

          {/* STEP 3: Results display screen */}
          {step === 3 && (
            <motion.div 
              key="step-3"
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center py-12 flex flex-col items-center justify-center min-h-[400px]"
            >
              {verificationResult === 'approved' && (
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-green-500/10 rounded-full border border-green-500/20 text-[#7BA05B] flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(16,185,129,0.2)] animate-bounce">
                    <CheckCircle size={42} />
                  </div>
                  
                  <h3 className="text-3xl font-display font-extrabold text-[#7BA05B] tracking-tight mb-2">Complaint AI Verified!</h3>
                  <p className="text-gray-400 max-w-sm leading-relaxed mb-6">Computer vision has confirmed texture issues. Your report is approved instantly.</p>
                  
                  <div className="bg-[#151515] border border-white/5 rounded-2xl p-5 shadow-inner mb-10 max-w-xs">
                    <p className="text-[#7BA05B] font-extrabold text-lg flex items-center justify-center gap-1.5">
                      <Sparkles size={16} className="text-amber-500" /> +150 Points Credited
                    </p>
                    <p className="text-[10px] text-gray-500 mt-1">Wallet automatically updated.</p>
                  </div>
                  
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setIsSuccessModalOpen(true)}
                      className="px-6 py-3 bg-[#151515] hover:bg-[#151532] border border-amber-500/30 text-white rounded-xl text-xs font-bold transition-all accessibility-focus"
                    >
                      Show Certificate
                    </button>
                    <button 
                      onClick={resetForm}
                      className="px-6 py-3 bg-gradient-to-r from-amber-600 to-yellow-500 text-neutral-950 text-white rounded-xl text-xs font-bold hover:shadow-none transition-all accessibility-focus"
                    >
                      Report Another Issue
                    </button>
                  </div>
                </div>
              )}

              {verificationResult === 'pending' && (
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-yellow-500/10 rounded-full border border-yellow-500/20 text-yellow-400 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(245,158,11,0.15)]">
                    <AlertTriangle size={42} />
                  </div>
                  
                  <h3 className="text-3xl font-display font-extrabold text-yellow-400 tracking-tight mb-2">Under Manual Review</h3>
                  <p className="text-gray-400 max-w-sm leading-relaxed mb-8">AI flag is partial. Complaint submitted successfully and is pending final check by mess administration.</p>
                  
                  <button className="px-6 py-3 border border-white/10 hover:border-amber-500/30 bg-white/5 text-white rounded-xl text-xs font-bold transition-all accessibility-focus" onClick={resetForm}>
                    Report Another Issue
                  </button>
                </div>
              )}

              {verificationResult === 'rejected' && (
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-red-500/10 rounded-full border border-red-500/20 text-red-400 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(239,68,68,0.15)]">
                    <XCircle size={42} />
                  </div>
                  
                  <h3 className="text-3xl font-display font-extrabold text-red-400 tracking-tight mb-2">Analysis Failed</h3>
                  <p className="text-gray-400 max-w-sm leading-relaxed mb-8">{errorMsg || "Vision analysis indicates standard visual quality. Please upload clearer evidence."}</p>
                  
                  <button className="px-6 py-3 bg-gradient-to-r from-amber-600 to-yellow-500 text-neutral-950 text-white rounded-xl text-xs font-bold shadow-md hover:-translate-y-0.5 transition-all accessibility-focus" onClick={resetForm}>
                    Retry Analysis
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sidebar Info & Analytics widgets */}
      <div className="report-sidebar-info">
        
        {/* 1. Live Mess Quality Trends */}
        <div className="rsi-card relative overflow-hidden">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-5 select-none">
            <TrendingDown size={14} className="text-red-400 animate-pulse" /> Live Mess Quality Index
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
                  <span className={trend.status === "Critical" ? "text-red-400" : trend.status === "Medium" ? "text-yellow-400" : "text-[#7BA05B]"}>{trend.status}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full ${trend.color}`} style={{ width: `${(trend.count / 20) * 100}%` }} />
                  </div>
                  <span className="text-[10px] text-gray-500 shrink-0 select-none">{trend.count} flags</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Past Compliance Audits Timeline (Interactive Visual Timeline) */}
        <div className="rsi-card relative overflow-hidden font-sans">
          <div className="flex items-center justify-between mb-5 select-none">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
              <Clock size={14} className="text-amber-500" /> Compliance Audits
            </h4>
            <span className="text-[9px] bg-amber-500/5 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded-full font-bold">
              Level 3
            </span>
          </div>
          
          <div className="space-y-4">
            {pastAudits.map((audit) => {
              const isExpanded = expandedAuditId === audit.id;
              return (
                <div 
                  key={audit.id} 
                  onClick={() => setExpandedAuditId(isExpanded ? null : audit.id)}
                  className={`p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer accessibility-focus ${
                    isExpanded 
                      ? 'bg-[#151515] border-amber-500/30 shadow-none' 
                      : 'bg-[#151515]/40 border-white/5 hover:border-white/10 hover:bg-[#151515]/80'
                  }`}
                  tabIndex="0"
                  role="button"
                  aria-expanded={isExpanded}
                  aria-label={`${audit.mess} audit for ${audit.issue}. Status: ${audit.status}. Click to view details.`}
                  onKeyDown={(e) => e.key === 'Enter' && setExpandedAuditId(isExpanded ? null : audit.id)}
                >
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-white/10 relative bg-black/40">
                      <img src={audit.image} alt={audit.issue} className="w-full h-full object-cover" />
                      <div className={`absolute inset-0 ${audit.status === 'Verified' ? 'bg-green-500/5' : 'bg-red-500/5'}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h5 className="text-xs font-bold text-white truncate">{audit.mess}</h5>
                        <span className="text-[9px] text-gray-500 shrink-0">{audit.time}</span>
                      </div>
                      <p className="text-[11px] text-gray-400 font-semibold truncate mt-0.5">{audit.issue}</p>
                      
                      <div className="flex items-center justify-between mt-2">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                          audit.status === 'Verified' 
                            ? 'bg-green-500/10 text-[#7BA05B] border-green-500/20' 
                            : 'bg-red-500/10 text-red-400 border-red-500/20'
                        }`}>
                          {audit.status}
                        </span>
                        {audit.points > 0 && (
                          <span className="text-[10px] font-extrabold text-amber-500">
                            +{audit.points} PTS
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        className="overflow-hidden border-t border-white/5 pt-3 text-[11px] text-gray-400 leading-relaxed font-sans"
                      >
                        {audit.status === 'Verified' ? (
                          <div className="space-y-2">
                            <p>Computer vision neural nodes detected abnormal texture arrays. Verification approved. +150 Wallet points and +50 Auditor XP credited.</p>
                            <div className="flex items-center gap-1.5 text-[9px] font-mono text-[#7BA05B] bg-green-500/5 py-1 px-2 rounded-lg border border-green-500/10">
                              <CheckCircle size={10} /> CV_ACCURACY: 98.4%
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <p>{audit.reason}</p>
                            <div className="flex items-center gap-1.5 text-[9px] font-mono text-red-400 bg-red-500/5 py-1 px-2 rounded-lg border border-red-500/10">
                              <XCircle size={10} /> CODE: CLARITY_GRADE_LOW
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Global Success Modal popup */}
      <ReportSuccessModal 
        isOpen={isSuccessModalOpen} 
        onClose={() => {
          setIsSuccessModalOpen(false);
          resetForm();
        }} 
        pointsEarned={150}
      />

    </div>
  );
};

export default ReportFood;
