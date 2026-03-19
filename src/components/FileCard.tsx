import { Download, Trash2, FileText, Image, Film, Music, Code, Archive, File } from 'lucide-react';
import { FileItem } from '../types';

interface FileCardProps {
  file: FileItem;
  onDownload: (id: string, name: string) => void;
  onDelete: (id: string, name: string) => void;
}

const formatBytes = (bytes: number) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

const formatDate = (iso: string) => {
  const d = new Date(iso);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  if (mins < 1) return 'Ahora mismo';
  if (mins < 60) return `Hace ${mins} min`;
  if (hours < 24) return `Hace ${hours} h`;
  if (days < 7) return `Hace ${days} días`;
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
};

const getFileInfo = (name: string) => {
  const ext = name.split('.').pop()?.toLowerCase() || '';
  if (['pdf'].includes(ext)) return { Icon: FileText, color: 'text-red-500', bg: 'bg-red-50' };
  if (['jpg','jpeg','png','gif','webp','svg','bmp'].includes(ext)) return { Icon: Image, color: 'text-green-500', bg: 'bg-green-50' };
  if (['mp4','avi','mov','mkv','webm'].includes(ext)) return { Icon: Film, color: 'text-purple-500', bg: 'bg-purple-50' };
  if (['mp3','wav','ogg','flac','aac'].includes(ext)) return { Icon: Music, color: 'text-blue-500', bg: 'bg-blue-50' };
  if (['js','ts','jsx','tsx','py','java','go','rs','cpp','c','html','css','json','yml','yaml'].includes(ext)) return { Icon: Code, color: 'text-yellow-500', bg: 'bg-yellow-50' };
  if (['zip','rar','7z','tar','gz'].includes(ext)) return { Icon: Archive, color: 'text-gray-500', bg: 'bg-gray-100' };
  return { Icon: File, color: 'text-orange-500', bg: 'bg-orange-50' };
};

export default function FileCard({ file, onDownload, onDelete }: FileCardProps) {
  const { Icon, color, bg } = getFileInfo(file.original_name);
  const ext = file.original_name.split('.').pop()?.toUpperCase() || 'FILE';

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-200 overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-orange-500 to-amber-400" />
      <div className="p-5">
        <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mb-4`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <p className="text-gray-800 font-semibold text-sm truncate mb-1" title={file.original_name}>
          {file.original_name}
        </p>
        <p className="text-xs text-gray-400 mb-1">{formatBytes(file.file_size)}</p>
        <p className="text-xs text-gray-300 mb-4">{formatDate(file.created_at)}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-gray-300 bg-gray-50 px-2 py-1 rounded-lg">{ext}</span>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onDownload(file.id, file.original_name)}
              className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all"
              title="Descargar"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(file.id, file.original_name)}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
              title="Eliminar"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}