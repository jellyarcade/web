const MenuItem = ({ href, icon: Icon, label, onClose }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Link
        href={href}
        className={`block text-white transition-colors ${
          isActive ? "bg-brand-green" : "hover:bg-brand-green-light"
        }`}
        onClick={onClose}
      >
        <span className="flex items-center px-4 py-4 font-semibold">
          <Icon className="w-6 h-6 mr-4" />
          <span className="text-lg">{label}</span>
        </span>
      </Link>
    </li>
  );
};

const Sidebar = ({ isOpen, onClose, children }) => {
  const t = useTranslations("navigation");

  const menuItems = [
    { href: "/", label: t("home"), icon: HiHome },
    { href: "/new-games", label: t("newGames"), icon: HiSparkles },
    { href: "/top-games", label: t("topGames"), icon: HiStar },
  ];

  return (
    <>
      {/* ... diğer kodlar ... */}
      <div className="absolute bottom-8 left-0 right-0 px-6">
        <button className="w-full flex items-center justify-center gap-2 bg-[#16bf36] text-white py-4 px-6 rounded-full text-lg font-semilight hover:bg-[#16bf36]/90 transition-colors">
          <HiOutlineEnvelope className="text-2xl" />
          {t("contactUs")}
        </button>
      </div>
      {/* ... diğer kodlar ... */}
    </>
  );
};
