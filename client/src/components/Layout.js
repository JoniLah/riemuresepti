const Layout = ({ children }) => {
    return (
        <div className="container-fluid g-0">
            <div className="row">
                {children}
            </div>
        </div>
    );
};

export default Layout;