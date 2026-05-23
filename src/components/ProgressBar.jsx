function ProgressBar({ progress }) {
  return (
    <div className="w-full bg-gray-200 h-4 rounded-full">
      <div
        className="bg-black h-4 rounded-full transition-all"
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  );
}

export default ProgressBar;