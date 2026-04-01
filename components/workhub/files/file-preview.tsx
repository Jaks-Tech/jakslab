export default function FilePreview({ url }: { url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      className="text-blue-600 underline text-sm"
    >
      View File
    </a>
  );
}