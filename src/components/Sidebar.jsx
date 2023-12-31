const Sidebar = () => {
    return ( 
        <div className="w-[15%] hidden md:block">
            <div className="bg-neutral-900 h-screen w-full flex items-center justify-center">
            <div className="h-[90%] w-[80%] flex flex-col items-start justify-between">
                <div className="flex flex-col gap-4">
                    <div className="text-3xl text-blue-500 font-bold">TeleBot</div>
                    <div>
                        <p className="text-neutral-400 text-sm">Control your own bot by pasting your own API key.</p>
                    </div>
                </div>
                <div className="w-full h-[6%] flex items-center gap-2">
                    <div className="bg-blue-500 rounded-full aspect-square h-full"></div>
                    <div className="font-bold text-white text-md">Manager</div>
                </div>
                
            </div>
        </div>
        </div>
        
     );
}
 
export default Sidebar;