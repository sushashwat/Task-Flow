function Header({total,completed}){
    const pending = total-completed;


return(
    <header className="app-header">
        <p className="header-eyebrow">Stay Organised</p>
        <h1 className="header-title">
            Task <span>Flow</span>
        </h1>
        <p className="header-subtitle">Manage Your Day to Day Tasks Easily</p>

        <div className="header-stats">
            <div className="stat">
                <span className="stat-number">{total}</span>
                <span className="stat-label">Total</span>
            </div>
            <div className="stat">
                <span className="stat-number">{pending}</span>
                <span className="stat-label">Pending</span>
            </div>
            <div className="stat">
                 <span className="stat-number">{completed}</span>
                <span className="stat-label">Done</span>
            </div>
        </div>



    </header>
);
}

export default Header;