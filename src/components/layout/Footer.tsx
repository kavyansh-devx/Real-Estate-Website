import { Link } from 'react-router-dom';

export function Footer() {
  const links = [
    { group: 'Properties', items: ['Villas', 'Penthouses', 'Mansions', 'Private Islands'] },
    { group: 'Services', items: ['AI Concierge', 'Virtual Tours', 'Legal Advisory', 'Interior Design'] },
    { group: 'Company', items: ['Consultants', 'Contact', 'Collection', 'Partners'] },
  ];

  const targets: Record<string, string> = {
    Villas: '/',
    Penthouses: '/',
    Mansions: '/',
    'Private Islands': '/',
    'AI Concierge': '/ai',
    'Virtual Tours': '/',
    'Legal Advisory': '/contact',
    'Interior Design': '/contact',
    Consultants: '/consultants',
    Contact: '/contact',
    Collection: '/wishlist',
    Partners: '/contact',
    Privacy: '/contact',
    Terms: '/contact',
    Accessibility: '/contact',
  };

  return (
    <footer className="bg-black border-t border-white/[0.06]">
      {/* Top Section */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
                <span className="text-black text-xs font-black">E</span>
              </div>
              <span className="text-white font-semibold tracking-tight text-[15px]">EstateX</span>
            </div>
            <p className="text-white/30 text-sm leading-relaxed max-w-xs">
              The future of ultra-luxury real estate, powered by artificial intelligence and human ambition.
            </p>
          </div>

          {/* Link Groups */}
          {links.map((group) => (
            <div key={group.group}>
              <h4 className="text-[11px] font-bold text-white/40 uppercase tracking-[0.15em] mb-5">
                {group.group}
              </h4>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li key={item}>
                    <Link to={targets[item]} className="text-sm text-white/50 hover:text-gold transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-5 flex flex-col md:flex-row justify-between items-center text-[11px] text-white/30">
          <p>© {new Date().getFullYear()} EstateX Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-3 md:mt-0">
            {['Privacy', 'Terms', 'Accessibility'].map((item) => (
              <Link key={item} to={targets[item]} className="hover:text-white/60 transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
