const Badge = ({ text, className }) => (
  <div className='relative'>
    <div
      className={`px-5 py-0.5 text-xl font-bold clip-badge min-w-[160px] ${className}`}
      style={{
        clipPath: 'polygon(0 0, 100% 0, 100% 45%, 90% 100%, 0 100%)',
      }}
    >
      {text}
    </div>
    <div
      className={`absolute -right-[1px] bottom-0 w-3.5 h-3.5 ${className}`}
      style={{
        clipPath: 'polygon(100% 1px, 100% 100%, 2px 100%)',
      }}
    />
  </div>
);

export default Badge;
