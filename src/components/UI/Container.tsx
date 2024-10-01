const Container = ({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`container mx-auto max-w-7xl  px-6 flex-grow ${className}`}>
      {children}
    </div>
  );
};

export default Container;
