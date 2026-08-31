export function NavbarSkeleton() {
  return (
    <div className="hidden items-center gap-2 md:flex">
      {["w-20", "w-16", "w-20", "w-24", "w-18"].map((w, i) => (
        <div key={i} className={`h-7 ${w} rounded-lg skeleton-box animate-shimmer`} />
      ))}
    </div>
  );
}

export default NavbarSkeleton;
