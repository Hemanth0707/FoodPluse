import useFoodStore from '../store/useFoodStore';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';

const Wallet = () => {
  const walletPoints = useFoodStore(state => state.walletPoints);

  return (
    <div className="wallet-layout">
      <div className="wallet-card">
        <div className="wc-label">Current Balance</div>
        <div className="wc-amount">{walletPoints} <span className="text-xl">pts</span></div>
        <div className="wc-sub">Valid until Dec 2026</div>
        
        <div className="wc-divider"></div>
        
        <div className="wc-row">
          <div>
            <div className="wc-sm-label">Spent</div>
            <div className="wc-sm-val used">150 pts</div>
          </div>
          <div>
            <div className="wc-sm-label">Remaining</div>
            <div className="wc-sm-val remaining">{walletPoints} pts</div>
          </div>
        </div>
        
        <div className="wc-progress-bar">
          <div className="wc-progress-fill" style={{ width: '70%' }}></div>
        </div>
        <div className="wc-progress-label">Semester limit: 2000 pts</div>
      </div>

      <div className="transaction-card flex-1">
        <h4>Recent Transactions</h4>
        <div className="tx-list">
          <div className="tx-item">
            <div className="tx-icon credit"><ArrowDownLeft size={16} /></div>
            <div className="tx-info">
              <strong>Compensation</strong>
              <p>Verified Bad Quality - Mess 1</p>
            </div>
            <div className="tx-amt credit">+150</div>
          </div>
          <div className="tx-item">
            <div className="tx-icon debit"><ArrowUpRight size={16} /></div>
            <div className="tx-info">
              <strong>Order Placed</strong>
              <p>Kitchen Ate - Token #KA-892</p>
            </div>
            <div className="tx-amt debit">-80</div>
          </div>
          <div className="tx-item">
            <div className="tx-icon credit"><ArrowDownLeft size={16} /></div>
            <div className="tx-info">
              <strong>Welcome Bonus</strong>
              <p>Initial semester allocation</p>
            </div>
            <div className="tx-amt credit">+500</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
