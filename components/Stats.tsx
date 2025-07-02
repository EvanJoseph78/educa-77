import { StatsProps } from '@/types/types';

export default function Stats({
    totalCards,
    studiedCards,
    filteredCards,
}: StatsProps) {
    const progressPercentage = Math.round((studiedCards / totalCards) * 100);

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex flex-wrap justify-between gap-4">
                <div className="text-center flex-1 min-w-[120px]">
                    <div className="text-3xl font-bold text-blue-500">{totalCards}</div>
                    <div className="text-sm text-gray-500">Total</div>
                </div>

                <div className="text-center flex-1 min-w-[120px]">
                    <div className="text-3xl font-bold text-green-500">{studiedCards}</div>
                    <div className="text-sm text-gray-500">Estudados</div>
                </div>

                <div className="text-center flex-1 min-w-[120px]">
                    <div className="text-3xl font-bold text-orange-500">
                        {totalCards - studiedCards}
                    </div>
                    <div className="text-sm text-gray-500">Restantes</div>
                </div>

                <div className="text-center flex-1 min-w-[120px]">
                    <div className="text-3xl font-bold text-purple-500">{filteredCards}</div>
                    <div className="text-sm text-gray-500">Filtrados</div>
                </div>
            </div>

            <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                    <span>Progresso</span>
                    <span>{progressPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                        className="bg-blue-500 h-2.5 rounded-full"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
}