const VendorDashboard = () => {
  return (
    <div>
      <div className="dash-cards">
        <div className="dcard" style={{ '--card-color': 'var(--purple)' }}>
          <div className="dcard-icon">📦</div>
          <div className="dcard-val">24</div>
          <div className="dcard-label">Active Orders</div>
          <div className="dcard-trend up">High Volume Time</div>
        </div>
        <div className="dcard" style={{ '--card-color': 'var(--green)' }}>
          <div className="dcard-icon">💰</div>
          <div className="dcard-val">12.5k</div>
          <div className="dcard-label">Points Earned Today</div>
          <div className="dcard-trend up">↑ 15% vs Yesterday</div>
        </div>
        <div className="dcard" style={{ '--card-color': 'var(--blue)' }}>
          <div className="dcard-icon">⭐</div>
          <div className="dcard-val">4.8</div>
          <div className="dcard-label">Average Rating</div>
          <div className="dcard-trend">Based on 120 reviews</div>
        </div>
      </div>

      <div className="dash-row">
        <div className="dash-widget wide">
          <div className="widget-header">
            <h3>Live Order Queue</h3>
          </div>
          <div className="complaint-list">
            <div className="complaint-item" style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid var(--purple)' }}>
              <div className="ci-icon">🍔</div>
              <div className="ci-info">
                <strong>Token #KA-089</strong>
                <span>2x Paneer Tikka Wrap, 1x Coke • Ordered 2 mins ago</span>
              </div>
              <button className="btn-sm-primary">Mark Ready</button>
            </div>
            <div className="complaint-item">
              <div className="ci-icon">🥤</div>
              <div className="ci-info">
                <strong>Token #KA-088</strong>
                <span>1x Cold Coffee • Ordered 5 mins ago</span>
              </div>
              <button className="btn-sm-primary">Mark Ready</button>
            </div>
            <div className="complaint-item opacity-60">
              <div className="ci-icon">🍟</div>
              <div className="ci-info">
                <strong>Token #KA-087</strong>
                <span>1x French Fries • Ready for Pickup</span>
              </div>
              <div className="text-green-500 text-sm font-bold px-3">Waiting...</div>
            </div>
          </div>
        </div>
        
        <div className="dash-widget">
          <div className="widget-header">
            <h3>AI Waste Predictor</h3>
          </div>
          <div className="mt-4">
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-4">
              <p className="text-red-400 font-bold text-sm mb-1">Warning: High Waste Expected</p>
              <p className="text-xs text-gray-400">Based on today's weather (Rainy) and weekday (Tuesday), expect 30% lower footfall for evening snacks.</p>
            </div>
            <h4 className="text-sm font-bold mb-2">Recommended Actions:</h4>
            <ul className="text-xs text-gray-400 space-y-2 list-disc pl-4">
              <li>Reduce Samosa prep by 50 units</li>
              <li>Offer 20% point discount on hot beverages</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
