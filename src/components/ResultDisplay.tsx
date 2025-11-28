
import React from 'react';
import { MedicationInfo } from '../types';
import { InfoIcon, SideEffectsIcon, WarningIcon, CheckCircleIcon, MoleculeIcon, UsersIcon, ExclamationCircleIcon, BanIcon, StethoscopeIcon, SwitchHorizontalIcon, UserGroupSlashIcon, CalendarDaysIcon, BanknotesIcon, GlobeAltIcon } from './icons';

interface ResultDisplayProps {
    result: MedicationInfo;
    image: string;
    onReset: () => void;
}

const InfoCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 h-full">
        <div className="flex items-center mb-3">
            {icon}
            <h3 className={`ml-3 text-xl font-semibold text-gray-800`}>{title}</h3>
        </div>
        <div className="text-gray-600 space-y-2">
            {children}
        </div>
    </div>
);

const ResultDisplay = ({ result, image, onReset }: ResultDisplayProps) => {
    return (
        <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
            `}</style>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 flex flex-col items-center bg-white p-6 rounded-xl shadow-md border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">{result.medicationName}</h2>
                    <img src={image} alt="Uploaded medication" className="rounded-lg object-contain max-h-60 w-full shadow-inner" />
                </div>
                <div className="md:col-span-2">
                    <InfoCard icon={<CheckCircleIcon className="h-7 w-7 text-green-500" />} title="Primary Use">
                        <p className="text-lg">{result.primaryUse}</p>
                    </InfoCard>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <InfoCard icon={<StethoscopeIcon className="h-7 w-7 text-indigo-500" />} title="Treats These Symptoms">
                    {result.treatableSymptoms.length > 0 ? (
                        <ul className="list-disc list-inside">
                            {result.treatableSymptoms.map((symptom, index) => <li key={index}>{symptom}</li>)}
                        </ul>
                    ) : <p>No specific symptoms listed.</p>}
                </InfoCard>
                <InfoCard icon={<SideEffectsIcon className="h-7 w-7 text-yellow-500" />} title="Common Side Effects">
                    {result.commonSideEffects.length > 0 ? (
                        <ul className="list-disc list-inside">
                            {result.commonSideEffects.map((effect, index) => <li key={index}>{effect}</li>)}
                        </ul>
                    ) : <p>No common side effects listed.</p>}
                </InfoCard>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <InfoCard icon={<UserGroupSlashIcon className="h-7 w-7 text-rose-500" />} title="Who Shouldn't Take It">
                    {result.contraindicatedGroups.length > 0 ? (
                        <ul className="list-disc list-inside">
                            {result.contraindicatedGroups.map((group, index) => <li key={index}>{group}</li>)}
                        </ul>
                    ) : <p>No specific groups listed. Consult a doctor.</p>}
                </InfoCard>
                <InfoCard icon={<CalendarDaysIcon className="h-7 w-7 text-cyan-500" />} title="Dosage Duration">
                    <p>{result.dosageDuration}</p>
                </InfoCard>
                 <InfoCard icon={<BanknotesIcon className="h-7 w-7 text-lime-600" />} title="Estimated Cost">
                    <p>{result.approximateCostKsh}</p>
                </InfoCard>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoCard icon={<MoleculeIcon className="h-7 w-7 text-sky-500" />} title="Active Ingredients">
                    {result.activeIngredients.length > 0 ? (
                        <ul className="list-disc list-inside">
                            {result.activeIngredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)}
                        </ul>
                    ) : <p>No active ingredients listed.</p>}
                </InfoCard>
                 <InfoCard icon={<SwitchHorizontalIcon className="h-7 w-7 text-purple-500" />} title="Alternative Medications">
                    {result.alternativeMedications.length > 0 ? (
                        <ul className="list-disc list-inside">
                            {result.alternativeMedications.map((alt, index) => <li key={index}>{alt}</li>)}
                        </ul>
                    ) : <p>No common alternatives listed.</p>}
                </InfoCard>
            </div>

            <div className="bg-red-50/50 p-6 rounded-xl shadow-md border border-red-200 space-y-6">
                <div className="flex items-center">
                    <WarningIcon className="h-8 w-8 text-red-500" />
                    <h3 className="ml-3 text-2xl font-bold text-red-800">Critical Warnings</h3>
                </div>

                {result.severeReactions.length > 0 && (
                    <div className="border-t border-red-200 pt-4">
                        <div className="flex items-start">
                            <ExclamationCircleIcon className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
                            <div className="ml-3">
                                <h4 className="font-semibold text-red-700">Seek Medical Help Immediately For:</h4>
                                <ul className="list-disc list-inside text-gray-700 mt-1">
                                    {result.severeReactions.map((item, index) => <li key={index}>{item}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {result.medicationInteractions.length > 0 && (
                    <div className="border-t border-red-200 pt-4">
                        <div className="flex items-start">
                            <BanIcon className="h-6 w-6 text-orange-600 flex-shrink-0 mt-0.5" />
                            <div className="ml-3">
                                <h4 className="font-semibold text-orange-800">Do Not Mix With These Medications:</h4>
                                <ul className="list-disc list-inside text-gray-700 mt-1">
                                    {result.medicationInteractions.map((item, index) => <li key={index}>{item}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {result.doNotMixWith.length > 0 && (
                    <div className="border-t border-red-200 pt-4">
                        <div className="flex items-start">
                            <BanIcon className="h-6 w-6 text-orange-600 flex-shrink-0 mt-0.5" />
                            <div className="ml-3">
                                <h4 className="font-semibold text-orange-800">Avoid These Foods, Drinks & Activities:</h4>
                                <ul className="list-disc list-inside text-gray-700 mt-1">
                                    {result.doNotMixWith.map((item, index) => <li key={index}>{item}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {(result.severeReactions.length === 0 && result.medicationInteractions.length === 0 && result.doNotMixWith.length === 0) && (
                    <p className="text-gray-700 border-t border-red-200 pt-4">No critical warnings were identified. However, always consult your doctor or pharmacist before taking any new medication, especially if you have pre-existing conditions or are taking other drugs.</p>
                )}
            </div>

            {result.sources && result.sources.length > 0 && (
                <InfoCard icon={<GlobeAltIcon className="h-7 w-7 text-gray-500" />} title="Sources">
                    <ul className="list-disc list-inside space-y-1">
                        {result.sources.map((source, index) => (
                            <li key={index} className="truncate">
                                <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline" title={source.title}>
                                    {source.title || new URL(source.uri).hostname}
                                </a>
                            </li>
                        ))}
                    </ul>
                </InfoCard>
            )}

            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <InfoIcon className="h-6 w-6 text-amber-500" />
                    </div>
                    <div className="ml-3">
                        <h3 className="text-lg font-medium text-amber-800">Disclaimer</h3>
                        <p className="mt-2 text-sm text-amber-700">{result.disclaimer}</p>
                    </div>
                </div>
            </div>

            <div className="text-center pt-4">
                <button
                    onClick={onReset}
                    className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                    Analyze Another Medication
                </button>
            </div>
        </div>
    );
};

export default ResultDisplay;
