export default function AppLogo() {
    return (
        <>
            <img 
              src="/Luckfeer.png" 
              alt="Luckfeer Logo" 
              className="aspect-square size-8 object-contain"
            />
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    LuckFeer
                </span>
            </div>
        </>
    );
}
