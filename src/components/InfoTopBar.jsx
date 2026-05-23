import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, GraduationCap, Award } from 'lucide-react';

export default function InfoTopBar() {
  return (
    <div className="info-topbar">
      <div className="info-topbar-left">
        <div className="info-topbar-item">
          <Phone size={13} color="#e0c878" />
          <span>+234 803 582 6674</span>
        </div>
        <div className="info-topbar-item">
          <Mail size={13} color="#e0c878" />
          <span>admissions@tansianuniversity.edu.ng</span>
        </div>
        <div className="info-topbar-item">
          <GraduationCap size={13} color="#e0c878" />
          <span>2025/2026 Admissions Ongoing</span>
        </div>
      </div>
      <div className="info-topbar-right">
        <div className="info-topbar-item">
          <Award size={13} color="#e0c878" />
          <span>NUC Fully Accredited</span>
        </div>
        <Link to="/admissions" className="info-topbar-link">
          Apply Online
        </Link>
      </div>
    </div>
  );
}
