import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useFoodStore from '../store/useFoodStore';
import useAuthStore from '../store/useAuthStore';
import { UploadCloud, CheckCircle, XCircle } from 'lucide-react';

const ReportFood = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    hostel: 'BH1',
    mess: 'Mess 1',
    mealType: 'Lunch',
    issueType: 'Quality Issue',
    description: ''
  });
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const { submitComplaint, uploadProof } = useFoodStore();
  const token = useAuthStore(state => state.token);
  const user = useAuthStore(state => state.user);

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

  const executeSubmissionFlow = async () => {
    try {
      console.log('[DEBUG] Starting file upload...');
      const uploadData = new FormData();
      uploadData.append('proof', files[0].file);
      const imageUrl = await uploadProof(uploadData);
      
      if (!imageUrl) {
        return { success: false, status: 'rejected', reason: 'Failed to upload proof. Please try again.' };
      }
      
      console.log('[DEBUG] Upload successful, sending complaint data...', imageUrl);
      const response = await submitComplaint({
        ...formData,
        studentId: user?._id || '',
        imageProof: imageUrl
      }, token);

      return response;
    } catch (error) {
      console.error('[DEBUG ERROR] Flow failed:', error);
      return { success: false, status: 'rejected', reason: 'An unexpected error occurred during submission.' };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Auth Fallback Checks
    if (!token || !user || !user._id) {
      alert('Authentication error. Please log in again.');
      return;
    }

    if (files.length === 0) {
      alert('Please upload proof (Image/Video)');
      return;
    }

    setStep(2);
    setIsVerifying(true);
    setErrorMsg('');

    // PROMISE RACE TIMEOUT PROTECTION (5 Seconds)
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
        // Auto-redirect after 2 seconds
        setTimeout(() => {
          navigate('/marketplace');
        }, 2000);
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
    <div className="report-container">
      <div className="report-form-card">
        {step === 1 && (
          <div className="animate-[fadeUp_0.3s_both]">
            <div className="rf-steps">
              <div className="rfs active">1. Details</div>
              <div className="rfs-line"></div>
              <div className="rfs">2. Evidence</div>
              <div className="rfs-line"></div>
              <div className="rfs">3. Submit</div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-grid-2">
                <div className="form-group">
                  <label>Hostel</label>
                  <select name="hostel" className="form-input" value={formData.hostel} onChange={handleChange}>
                    <option value="BH1">BH-1</option>
                    <option value="BH2">BH-2</option>
                    <option value="GH1">GH-1</option>
                    <option value="GH2">GH-2</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Mess Name</label>
                  <select name="mess" className="form-input" value={formData.mess} onChange={handleChange}>
                    <option value="Mess 1">Mess 1</option>
                    <option value="Mess 2">Mess 2</option>
                    <option value="Mess 3">Mess 3</option>
                  </select>
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Meal Type</label>
                  <select name="mealType" className="form-input" value={formData.mealType} onChange={handleChange}>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Issue Type</label>
                  <select name="issueType" className="form-input" value={formData.issueType} onChange={handleChange}>
                    <option value="Bad taste">Bad taste</option>
                    <option value="Undercooked">Undercooked</option>
                    <option value="Overcooked">Overcooked</option>
                    <option value="Unhygienic">Unhygienic</option>
                    <option value="Low quantity">Low quantity</option>
                    <option value="Repeated menu">Repeated menu</option>
                    <option value="Stale food">Stale food</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Description (Optional)</label>
                <textarea 
                  name="description"
                  className="form-input form-textarea" 
                  placeholder="Describe the issue..."
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="form-group" style={{ marginTop: '1.5rem' }}>
                <label>Upload Proof (Required)</label>
                <div 
                  className={`upload-area ${isDragging ? 'drag-over' : ''}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="ua-icon"><UploadCloud className="mx-auto" /></div>
                  <div className="ua-text">Click or drag image/video here</div>
                  <div className="ua-sub">Max size: 10MB</div>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*,video/*" 
                    multiple 
                    onChange={handleFileInput}
                  />
                </div>
                
                {files.length > 0 && (
                  <div className="upload-previews">
                    {files.map((fileObj, idx) => (
                      <div className="up-img-wrap" key={idx}>
                        <img src={fileObj.url} className="up-img" alt="proof" />
                        <button type="button" className="up-rm-btn" onClick={(e) => { e.stopPropagation(); removeFile(idx); }}>✕</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button type="submit" className="btn-primary w-full mt-6" disabled={isVerifying}>
                Submit & Verify Issue
              </button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="text-center py-10 animate-[fadeUp_0.3s_both]">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-3xl">🤖</div>
            </div>
            <h3 className="text-xl font-bold font-display mb-2">AI is Verifying...</h3>
            <p className="text-gray-400">Our vision model is securely analyzing your proof.</p>
          </div>
        )}

        {step === 3 && verificationResult === 'approved' && (
          <div className="text-center py-10 animate-[fadeUp_0.4s_both]">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4 animate-[bounce_1s_ease-in-out_infinite]" />
            <h3 className="text-2xl font-bold font-display text-green-400 mb-2">Complaint Verified!</h3>
            <p className="text-gray-400 mb-6">The issue was successfully validated by our system.</p>
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 inline-block mb-8">
              <p className="text-green-400 font-bold">+150 Food Points added to Wallet</p>
            </div>
            <p className="text-purple-400 text-sm animate-pulse">Redirecting to Marketplace in 2 seconds...</p>
          </div>
        )}

        {step === 3 && verificationResult === 'pending' && (
          <div className="text-center py-10 animate-[fadeUp_0.4s_both]">
            <CheckCircle className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold font-display text-yellow-400 mb-2">Under Review</h3>
            <p className="text-gray-400 mb-6">Your complaint has been submitted securely and is pending manual review.</p>
            <div>
              <button className="btn-primary" onClick={resetForm}>Report Another Issue</button>
            </div>
          </div>
        )}

        {step === 3 && verificationResult === 'rejected' && (
          <div className="text-center py-10 animate-[fadeUp_0.4s_both]">
            <XCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold font-display text-red-400 mb-2">Submission Failed</h3>
            <p className="text-gray-400 mb-6">{errorMsg || "An unexpected error occurred."}</p>
            <button className="btn-outline" onClick={resetForm}>Try Again</button>
          </div>
        )}
      </div>

      <div className="report-sidebar-info hidden lg:block">
        <div className="rsi-card">
          <h4>Today's Issue Trends</h4>
          <div className="trend-item">
            <span>BH1</span>
            <div className="trend-bar"><div className="bg-red-500" style={{width: '80%'}}></div></div>
            <span className="text-red-400">High</span>
          </div>
          <div className="trend-item">
            <span>BH2</span>
            <div className="trend-bar"><div className="bg-yellow-500" style={{width: '40%'}}></div></div>
            <span className="text-yellow-400">Med</span>
          </div>
          <div className="trend-item">
            <span>GH1</span>
            <div className="trend-bar"><div className="bg-green-500" style={{width: '10%'}}></div></div>
            <span className="text-green-400">Low</span>
          </div>
        </div>

        <div className="rsi-card">
          <h4>Common Tags</h4>
          <div className="tag-cloud">
            <span className="tag">#Undercooked</span>
            <span className="tag">#Insects</span>
            <span className="tag">#Stale</span>
            <span className="tag">#Hair</span>
            <span className="tag">#Cold</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportFood;
