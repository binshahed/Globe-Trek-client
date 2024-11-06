const InfoCard = ({
  title,
  value,
  icon
}: {
  title: any;
  value: any;
  icon: any;
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4 border border-gray-200">
      <div className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full">
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

export default InfoCard;
