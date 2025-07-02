import { ControlsProps } from '@/types/types';
import { Eye, EyeOff, Shuffle, RotateCcw } from 'lucide-react';

export default function Controls({
  onShowAll,
  onHideAll,
  onReset,
  onShuffle,
}: ControlsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={onShowAll}
        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
      >
        <Eye className="w-4 h-4" />
        <span className="text-sm">Mostrar Todas</span>
      </button>
      
      <button
        onClick={onHideAll}
        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
      >
        <EyeOff className="w-4 h-4" />
        <span className="text-sm">Ocultar Todas</span>
      </button>
      
      <button
        onClick={onReset}
        className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
      >
        <RotateCcw className="w-4 h-4" />
        <span className="text-sm">Reiniciar</span>
      </button>
      
      <button
        onClick={onShuffle}
        className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md transition-colors"
      >
        <Shuffle className="w-4 h-4" />
        <span className="text-sm">Embaralhar</span>
      </button>
    </div>
  );
}