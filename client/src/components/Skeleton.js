import classNames from 'classnames';

const Skeleton = ({ times, className }) => {
    const external = classNames(
        "relative",
        "overflow-hidden",
        "bg-gray-100",
        "rounded",
        "mb-2.5",
        className
    );

    const internal = classNames(
        "animate-shimmer",
        "absolute",
        "inset-0",
        "-translate-x-full",
        "bg-gradient-to-r",
        "from-gray-100",
        "via-white",
        "to-gray-100"
    );

    const loader = Array(times).fill(0).map((_, i) => {
        return (
            <div key={i} className={external}>
                <div className={internal} />
            </div>
        );
    });

    return loader;
};

export default Skeleton;