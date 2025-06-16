import React, { useState } from 'react';
import { Calendar, X, Plus, Edit, Trash2, Clock, MapPin, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CalendarioModerno = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([
    { 
      id: 1, 
      title: 'Reunião de Equipe', 
      date: '2025-06-15', 
      time: '14:00',
      description: 'Reunião semanal da equipe de desenvolvimento',
      location: 'Sala de Conferências',
      attendees: 'João, Maria, Pedro',
      color: 'bg-sky-500' 
    },
    { 
      id: 2, 
      title: 'Apresentação Cliente', 
      date: '2025-06-18', 
      time: '10:30',
      description: 'Apresentação do projeto para o cliente ABC',
      location: 'Online - Zoom',
      attendees: 'Equipe Comercial',
      color: 'bg-green-500' 
    },
    { 
      id: 3, 
      title: 'Workshop React', 
      date: '2025-06-20', 
      time: '09:00',
      description: 'Workshop interno sobre React e hooks avançados',
      location: 'Lab de Desenvolvimento',
      attendees: 'Todos os devs',
      color: 'bg-purple-500' 
    }
  ]);
  
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [clickedDate, setClickedDate] = useState(null);
  
  const [eventForm, setEventForm] = useState({
    title: '',
    date: '',
    time: '',
    description: '',
    location: '',
    attendees: '',
    color: 'bg-blue-500'
  });

  const colors = [
    { name: 'Azul', value: 'bg-blue-500' },
    { name: 'Verde', value: 'bg-green-500' },
    { name: 'Roxo', value: 'bg-purple-500' },
    { name: 'Vermelho', value: 'bg-red-500' },
    { name: 'Amarelo', value: 'bg-yellow-500' },
    { name: 'Rosa', value: 'bg-pink-500' }
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();
    
    const days = [];
    
    // Dias do mês anterior
    for (let i = startDay - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({ date: prevDate, isCurrentMonth: false });
    }
    
    // Dias do mês atual
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({ date: new Date(year, month, day), isCurrentMonth: true });
    }
    
    // Dias do próximo mês para completar a grade
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push({ date: new Date(year, month + 1, day), isCurrentMonth: false });
    }
    
    return days;
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const getEventsForDate = (date) => {
    const dateStr = formatDate(date);
    return events.filter(event => event.date === dateStr);
  };

  const handleDateClick = (date) => {
    setClickedDate(date);
    setEventForm({
      title: '',
      date: formatDate(date),
      time: '',
      description: '',
      location: '',
      attendees: '',
      color: 'bg-blue-500'
    });
    setIsEditing(false);
    setSelectedEvent(null);
    setShowEventModal(true);
  };

  const handleEventClick = (event, e) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setEventForm(event);
    setIsEditing(true);
    setShowEventModal(true);
  };

  const handleSaveEvent = () => {
    if (!eventForm.title.trim()) return;
    
    if (isEditing) {
      setEvents(events.map(event => 
        event.id === selectedEvent.id ? { ...eventForm, id: selectedEvent.id } : event
      ));
    } else {
      const newEvent = {
        ...eventForm,
        id: Date.now()
      };
      setEvents([...events, newEvent]);
    }
    
    setShowEventModal(false);
    resetForm();
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setEvents(events.filter(event => event.id !== selectedEvent.id));
      setShowEventModal(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setEventForm({
      title: '',
      date: '',
      time: '',
      description: '',
      location: '',
      attendees: '',
      color: 'bg-blue-500'
    });
    setSelectedEvent(null);
    setIsEditing(false);
  };

  const navigateMonth = (direction) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="min-h-screen bg-gradient-to-br to-indigo-100 p-4"
      >
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Calendar className="w-8 h-8" />
                  <h1 className="text-3xl font-bold">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h1>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => navigateMonth(-1)}
                    className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => setCurrentDate(new Date())}
                    className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
                  >
                    Hoje
                  </button>
                  <button
                    onClick={() => navigateMonth(1)}
                    className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
                  >
                    → 
                  </button>
                </div>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="p-6">
              {/* Week Days Header */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {weekDays.map(day => (
                  <div key={day} className="text-center font-semibold text-gray-600 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-2">
                {getDaysInMonth(currentDate).map((day, index) => (
                  <div
                    key={index}
                    onClick={() => day.isCurrentMonth && handleDateClick(day.date)}
                    className={`
                      min-h-[100px] p-2 border-2 rounded-xl cursor-pointer transition-all duration-200
                      ${day.isCurrentMonth 
                        ? 'border-gray-200 hover:border-blue-300 hover:bg-blue-50' 
                        : 'border-gray-100 bg-gray-50 cursor-not-allowed'
                      }
                      ${day.date.toDateString() === new Date().toDateString() 
                        ? 'ring-2 ring-blue-400 bg-blue-50' 
                        : ''
                      }
                    `}
                  >
                    <div className={`
                      text-sm font-medium mb-1
                      ${day.isCurrentMonth ? 'text-gray-800' : 'text-gray-400'}
                      ${day.date.toDateString() === new Date().toDateString() ? 'text-blue-600 font-bold' : ''}
                    `}>
                      {day.date.getDate()}
                    </div>
                    
                    {day.isCurrentMonth && getEventsForDate(day.date).map(event => (
                      <div
                        key={event.id}
                        onClick={(e) => handleEventClick(event, e)}
                        className={`
                          ${event.color} text-white text-xs p-1 rounded mb-1 cursor-pointer
                          hover:scale-105 transition-transform truncate
                        `}
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Event Modal */}
        <AnimatePresence>
          {showEventModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {isEditing ? 'Editar Evento' : 'Novo Evento'}
                    </h2>
                    <button
                      onClick={() => setShowEventModal(false)}
                      className="text-gray-500 hover:text-gray-700 p-1"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Título do Evento
                      </label>
                      <input
                        type="text"
                        value={eventForm.title}
                        onChange={(e) => setEventForm({...eventForm, title: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Digite o título do evento"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Calendar className="w-4 h-4 inline mr-1" />
                          Data
                        </label>
                        <input
                          type="date"
                          value={eventForm.date}
                          onChange={(e) => setEventForm({...eventForm, date: e.target.value})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Clock className="w-4 h-4 inline mr-1" />
                          Hora
                        </label>
                        <input
                          type="time"
                          value={eventForm.time}
                          onChange={(e) => setEventForm({...eventForm, time: e.target.value})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="w-4 h-4 inline mr-1" />
                        Local
                      </label>
                      <input
                        type="text"
                        value={eventForm.location}
                        onChange={(e) => setEventForm({...eventForm, location: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Onde será o evento?"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="w-4 h-4 inline mr-1" />
                        Participantes
                      </label>
                      <input
                        type="text"
                        value={eventForm.attendees}
                        onChange={(e) => setEventForm({...eventForm, attendees: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Quem vai participar?"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descrição
                      </label>
                      <textarea
                        value={eventForm.description}
                        onChange={(e) => setEventForm({...eventForm, description: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows="3"
                        placeholder="Detalhes do evento..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cor do Evento
                      </label>
                      <div className="flex space-x-2">
                        {colors.map(color => (
                          <button
                            key={color.value}
                            onClick={() => setEventForm({...eventForm, color: color.value})}
                            className={`
                              w-8 h-8 rounded-full ${color.value} border-2 transition-transform
                              ${eventForm.color === color.value ? 'border-gray-800 scale-110' : 'border-gray-300'}
                            `}
                            title={color.name}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3 mt-8">
                    {isEditing && (
                      <button
                        onClick={handleDeleteEvent}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Excluir
                      </button>
                    )}
                    <button
                      onClick={() => setShowEventModal(false)}
                      className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleSaveEvent}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {isEditing ? 'Salvar' : 'Criar'}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default CalendarioModerno;