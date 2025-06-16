import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Autocomplete from '@mui/joy/Autocomplete';
import Textarea from '@mui/joy/Textarea';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { useOutletContext } from 'react-router-dom';
import { createApiUrl, apiConfig } from '../utils/apiConfig';
import Checkbox from '@mui/joy/Checkbox';

export default function RegistoAusencias() {
  const { user_id } = useOutletContext<{ user_id: number | null }>();
  const [activeButton, setActiveButton] = useState<'registar'>('registar');
  const [startDate, setStartDate] = React.useState<Dayjs | null>(null);
  const [endDate, setEndDate] = React.useState<Dayjs | null>(null);
  const [absenceType, setAbsenceType] = React.useState<string | null>(null);
  const [description, setDescription] = React.useState('');
  const [success, setSuccess] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleRegister = async () => {
    setSuccess(null);
    setError(null);
    if (!user_id || !startDate || !endDate || !absenceType) {
      setError('Por favor preencha todos os campos obrigatórios.');
      return;
    }
    const payload = {
      user_id,
      start_date: startDate.format('YYYY-MM-DD HH:mm:ss'),
      end_date: endDate.format('YYYY-MM-DD HH:mm:ss'),
      absence_type: absenceType,
      description,
      status: 'Pending',
      approver_id: 2,
      approval_date: null,
      created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    };
    try {
      const res = await fetch(createApiUrl(apiConfig.endpoints.absences), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Erro ao registar ausência');
      setSuccess('Ausência registada com sucesso!');
      setStartDate(null);
      setEndDate(null);
      setAbsenceType(null);
      setDescription('');
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido');
      console.error(err);
    }
  };

  const handleButtonClick = (buttonName: 'registar') => {
    setActiveButton(buttonName);
  };

  const Ausencia = [
    { label: 'Férias' },
    { label: 'Feriado' },
    { label: 'Licença médica' },
    { label: 'Outros' }
  ];

  const contentMap = {
    registar: {
      content: (
        <div className="min-h-screen bg-gradient-to-br p-6">
          {/* Header */}
          <div className="max-w-7xl mx-auto mb-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
                Registro de Ausências
              </h1>
              <p className="text-slate-600 text-lg">Gerencie suas ausências de forma eficiente</p>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Time Section */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                {/* Time Card */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">Período</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Data/Hora Início</label>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          label="Início"
                          value={startDate}
                          onChange={setStartDate}
                          sx={{ width: '100%' }}
                        />
                      </LocalizationProvider>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Data/Hora Fim</label>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          label="Fim"
                          value={endDate}
                          onChange={setEndDate}
                          sx={{ width: '100%' }}
                        />
                      </LocalizationProvider>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Absence & Details Section */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-6"
              >
                {/* Absence Card */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">Tipo de Ausência</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Categoria</label>
                      <Autocomplete
                        placeholder="Selecione uma categoria..."
                        options={Ausencia.map(a => a.label)}
                        value={absenceType}
                        onChange={(_, v) => setAbsenceType(v)}
                        sx={{ 
                          '& .MuiAutocomplete-root': {
                            borderRadius: '12px',
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Description Card */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">Descrição</h2>
                  </div>
                  
                  {success && <div className="text-green-600 pb-4 text-center font-medium">{success}</div>}
                  {error && <div className="text-red-600 pb-4 text-center font-medium">{error}</div>}
                  
                  <Textarea
                    placeholder="Descreva o motivo da ausência..."
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    minRows={6}
                    sx={{ 
                      width: '100%',
                      borderRadius: '12px',
                      '& .MuiTextarea-textarea': {
                        fontSize: '16px',
                        lineHeight: '1.5',
                      }
                    }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center mt-12"
            >
              <button 
                className="group relative px-12 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700"
                onClick={handleRegister}
              >
                <span className="flex items-center">
                  <svg className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Registrar Ausência
                </span>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
            </motion.div>
          </div>
        </div>
      )
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {contentMap[activeButton].content}
      </motion.div>
    </AnimatePresence>
  );
}