const Complaint = require('../models/Complaint');
const User = require('../models/User');

const VERIFICATION_THRESHOLD = 5;

exports.submitComplaint = async (req, res) => {
  const { hostel, mess, mealType, issueType, description, imageProof } = req.body;
  const studentId = req.user._id;

  try {
    console.log(`[DEBUG] Complaint Submission Started for studentId: ${studentId}`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let initialStatus = 'Pending';
    let marketplaceUnlocked = false;
    
    // TEST MODE: If an image is uploaded, automatically approve it
    if (imageProof) {
      initialStatus = 'Verified';
      marketplaceUnlocked = true;
      console.log(`[DEBUG] Image proof provided. Auto-verifying complaint.`);
    }

    const complaint = await Complaint.create({
      studentId,
      hostel,
      mess,
      mealType,
      issueType,
      description,
      imageProof,
      status: initialStatus
    });

    // AI VALIDATION LOGIC (Threshold-based)
    const similarComplaintsCount = await Complaint.countDocuments({
      hostel,
      mess,
      mealType,
      createdAt: { $gte: today }
    });

    if (similarComplaintsCount >= VERIFICATION_THRESHOLD && initialStatus !== 'Verified') {
      await Complaint.updateMany(
        { hostel, mess, mealType, createdAt: { $gte: today }, status: 'Pending' },
        { $set: { status: 'Verified' } }
      );
      initialStatus = 'Verified';
      marketplaceUnlocked = true;
      complaint.status = 'Verified';
      console.log(`[DEBUG] Threshold reached for ${hostel} ${mess}. Auto-verified.`);
    }

    // Add Wallet Points if Verified
    if (initialStatus === 'Verified') {
      const user = await User.findById(studentId);
      if (user) {
        user.foodPoints = (user.foodPoints || 0) + 150;
        await user.save();
        console.log(`[DEBUG] Added 150 points to user ${user.email}.`);
      }
    }

    console.log(`[DEBUG] Complaint Processed successfully. Status: ${initialStatus}`);
    
    // Strict JSON response format
    if (initialStatus === 'Verified') {
      return res.status(201).json({
        success: true,
        status: "Verified",
        marketplaceUnlocked: true,
        complaint
      });
    } else {
      return res.status(201).json({
        success: true,
        status: "Pending Review",
        complaint
      });
    }

  } catch (error) {
    console.error(`[DEBUG ERROR] Complaint submission failed:`, error.message);
    return res.status(500).json({ 
      success: false, 
      status: "Rejected", 
      reason: error.message 
    });
  }
};

exports.getComplaints = async (req, res) => {
  const { hostel, mess, status } = req.query;
  let filter = {};
  if (hostel) filter.hostel = hostel;
  if (mess) filter.mess = mess;
  if (status) filter.status = status;

  try {
    const complaints = await Complaint.find(filter).populate('studentId', 'name lpuId').sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const complaint = await Complaint.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
