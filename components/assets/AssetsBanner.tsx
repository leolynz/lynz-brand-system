interface AssetsBannerProps {
  title: string
  subtitle: string
}

export function AssetsBanner({ title, subtitle }: AssetsBannerProps) {
  return (
    <div className="relative h-40 overflow-hidden">
      <style>{`
        @keyframes bannerGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .assets-banner-bg {
          background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
          background-size: 400% 400%;
          animation: bannerGradient 12s ease infinite;
        }
      `}</style>
      <div className="assets-banner-bg absolute inset-0" />
      <div className="absolute bottom-0 left-0 p-8">
        <h1 className="text-2xl font-semibold text-white">{title}</h1>
        <p className="text-sm text-white/70 mt-1">{subtitle}</p>
      </div>
    </div>
  )
}
