export default function Seperator({ label }) {
  return (
    <div className="w-full flex items-center justify-center gap-3">
      <span className="flex-grow h-[2px] bg-gradient-to-r from-gray-300 via-gray-200 to-gray-100/60" />
      <p className="text-gray-400">{label}</p>
      <span className="flex-grow h-[2px] bg-gradient-to-l from-gray-300 via-gray-200 to-gray-100/60" />
    </div>
  );
}
