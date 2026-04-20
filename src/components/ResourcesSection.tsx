const resources = [
  {
    name: 'Now Learning (free)',
    desc: 'Admin Fundamentals on-demand course — mandatory prerequisite',
    arrow: 'nowlearning.servicenow.com',
    url: 'https://nowlearning.servicenow.com/lxp/en/now-platform/servicenow-administration-fundamentals-on-demand?id=learning_course_prev&course_id=91e2630b47503d5890542034846d43ac',
  },
  {
    name: 'Developer PDI',
    desc: 'Free Personal Developer Instance — hands-on practice environment',
    arrow: 'developer.servicenow.com',
    url: 'https://developer.servicenow.com/',
  },
  {
    name: 'SkillCertPro Mocks',
    desc: '1000+ CSA practice questions — best available mock bank',
    arrow: 'skillcertpro.com',
    url: 'https://skillcertpro.com/product/servicenow-csa-admin-exam-questions/',
  },
  {
    name: 'ServiceNow Docs',
    desc: 'Official documentation — familiarise now, closed during actual exam',
    arrow: 'docs.servicenow.com',
    url: 'https://docs.servicenow.com/',
  },
];

export default function ResourcesSection() {
  return (
    <div className="px-10 pb-10">
      <div className="font-mono text-[11px] uppercase tracking-widest text-[#4a5e7a] mb-4">
        Essential resources
      </div>
      <div className="grid grid-cols-4 gap-3 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
        {resources.map((r) => (
          <a
            key={r.url}
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#111827] border border-[#1e2d47] rounded-[10px] px-4 py-4 block transition-all duration-200 hover:border-[#2a3f5c] hover:bg-[#1a2236] hover:-translate-y-px"
          >
            <div className="text-[13px] font-medium text-[#e8edf5] mb-1">{r.name}</div>
            <div className="text-[11px] text-[#4a5e7a] leading-snug">{r.desc}</div>
            <div className="text-[11px] text-[#00d4aa] mt-2">{r.arrow} ↗</div>
          </a>
        ))}
      </div>
    </div>
  );
}
