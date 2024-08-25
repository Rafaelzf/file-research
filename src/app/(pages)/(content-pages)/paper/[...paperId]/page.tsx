export default function Paper({ params }: { params: { paperId: string } }) {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600">
      {params.paperId}
    </div>
  );
}
