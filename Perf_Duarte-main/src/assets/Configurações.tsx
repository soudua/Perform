import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Simulação de dados - substitua por suas APIs reais
const mockClientes = [
  { id: 1, nome: 'Cliente A', email: 'clientea@example.com', telefone: '123456789' },
  { id: 2, nome: 'Cliente B', email: 'clienteb@example.com', telefone: '987654321' },
];

const mockProjetos = [
  { id: 1, nome: 'Projeto Alpha', cliente_id: 1, status: 'Ativo', data_inicio: '2024-01-15' },
  { id: 2, nome: 'Projeto Beta', cliente_id: 2, status: 'Em Progresso', data_inicio: '2024-02-01' },
];

const mockUtilizadores = [
  { id: 1, nome: 'João Silva', email: 'joao@example.com', role: 'Admin', ativo: true },
  { id: 2, nome: 'Maria Santos', email: 'maria@example.com', role: 'User', ativo: true },
];

type Entity = 'clientes' | 'projetos' | 'utilizadores';
type Action = 'adicionar' | 'eliminar' | 'modificar';

export default function Configurações() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [currentStep, setCurrentStep] = useState<'login' | 'action' | 'entity' | 'crud'>('login');
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Estados para dados
  const [clientes, setClientes] = useState(mockClientes);
  const [projetos, setProjetos] = useState(mockProjetos);
  const [utilizadores, setUtilizadores] = useState(mockUtilizadores);

  // Estados para formulários
  const [formData, setFormData] = useState<any>({});
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleLogin = () => {
    if (password === 'admin123') { // Substitua por sua validação real
      setIsAuthenticated(true);
      setCurrentStep('action');
    } else {
      alert('Senha incorreta!');
    }
  };

  const handleActionSelect = (action: Action) => {
    setSelectedAction(action);
    setCurrentStep('entity');
  };

  const handleEntitySelect = (entity: Entity) => {
    setSelectedEntity(entity);
    setCurrentStep('crud');
    setFormData({});
    setSelectedItem(null);
    setIsEditing(false);
  };

  const handleBack = () => {
    if (currentStep === 'entity') {
      setCurrentStep('action');
      setSelectedAction(null);
    } else if (currentStep === 'crud') {
      setCurrentStep('entity');
      setSelectedEntity(null);
    }
  };

  const getEntityData = () => {
    switch (selectedEntity) {
      case 'clientes': return clientes;
      case 'projetos': return projetos;
      case 'utilizadores': return utilizadores;
      default: return [];
    }
  };

  const getEntityFields = () => {
    switch (selectedEntity) {
      case 'clientes':
        return [
          { key: 'nome', label: 'Nome', type: 'text' },
          { key: 'email', label: 'Email', type: 'email' },
          { key: 'telefone', label: 'Telefone', type: 'tel' }
        ];
      case 'projetos':
        return [
          { key: 'nome', label: 'Nome do Projeto', type: 'text' },
          { key: 'cliente_id', label: 'Cliente ID', type: 'number' },
          { key: 'status', label: 'Status', type: 'select', options: ['Ativo', 'Em Progresso', 'Concluído', 'Pausado'] },
          { key: 'data_inicio', label: 'Data de Início', type: 'date' }
        ];
      case 'utilizadores':
        return [
          { key: 'nome', label: 'Nome', type: 'text' },
          { key: 'email', label: 'Email', type: 'email' },
          { key: 'role', label: 'Função', type: 'select', options: ['Admin', 'User', 'Manager'] },
          { key: 'ativo', label: 'Ativo', type: 'checkbox' }
        ];
      default: return [];
    }
  };

  const handleSubmit = () => {
    const data = getEntityData();
    const newId = Math.max(...data.map(item => item.id)) + 1;

    if (selectedAction === 'adicionar') {
      const newItem = { ...formData, id: newId };
      
      switch (selectedEntity) {
        case 'clientes':
          setClientes([...clientes, newItem]);
          break;
        case 'projetos':
          setProjetos([...projetos, newItem]);
          break;
        case 'utilizadores':
          setUtilizadores([...utilizadores, newItem]);
          break;
      }
      alert('Item adicionado com sucesso!');
    } else if (selectedAction === 'modificar' && selectedItem) {
      const updatedItem = { ...selectedItem, ...formData };
      
      switch (selectedEntity) {
        case 'clientes':
          setClientes(clientes.map(c => c.id === selectedItem.id ? updatedItem : c));
          break;
        case 'projetos':
          setProjetos(projetos.map(p => p.id === selectedItem.id ? updatedItem : p));
          break;
        case 'utilizadores':
          setUtilizadores(utilizadores.map(u => u.id === selectedItem.id ? updatedItem : u));
          break;
      }
      alert('Item modificado com sucesso!');
    }
    
    setFormData({});
    setSelectedItem(null);
    setIsEditing(false);
  };

  const handleDelete = (item: any) => {
    if (!confirm(`Tem certeza que deseja eliminar "${item.nome}"?`)) return;
    
    switch (selectedEntity) {
      case 'clientes':
        setClientes(clientes.filter(c => c.id !== item.id));
        break;
      case 'projetos':
        setProjetos(projetos.filter(p => p.id !== item.id));
        break;
      case 'utilizadores':
        setUtilizadores(utilizadores.filter(u => u.id !== item.id));
        break;
    }
    alert('Item eliminado com sucesso!');
  };

  const handleEdit = (item: any) => {
    setSelectedItem(item);
    setFormData(item);
    setIsEditing(true);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 max-w-md w-full"
        >
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v3m0-3h3m-3 0h-3m-3-5a6 6 0 1112 0v1.5a2.5 2.5 0 01-5 0V12a6 6 0 00-12 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Painel de Administração</h1>
            <p className="text-slate-600">Digite a senha para continuar</p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Senha de administrador"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {showPassword ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M14.121 14.121l1.415 1.415M14.121 14.121L9.878 9.878m4.242 4.242L8.464 8.464" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  )}
                </svg>
              </button>
            </div>

            <button
              onClick={handleLogin}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Entrar
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (currentStep === 'action') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
              Selecione uma Ação
            </h1>
            <p className="text-slate-600 text-lg">Escolha o que deseja fazer</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { action: 'adicionar' as Action, title: 'Adicionar', icon: '➕', color: 'from-green-500 to-emerald-600', desc: 'Criar novos registos' },
              { action: 'modificar' as Action, title: 'Modificar', icon: '✏️', color: 'from-blue-500 to-indigo-600', desc: 'Editar registos existentes' },
              { action: 'eliminar' as Action, title: 'Eliminar', icon: '🗑️', color: 'from-red-500 to-pink-600', desc: 'Remover registos' }
            ].map((item, index) => (
              <motion.div
                key={item.action}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onClick={() => handleActionSelect(item.action)}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2 text-center">{item.title}</h3>
                <p className="text-slate-600 text-center">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'entity') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
              {selectedAction === 'adicionar' && 'Adicionar'}
              {selectedAction === 'modificar' && 'Modificar'}
              {selectedAction === 'eliminar' && 'Eliminar'}
            </h1>
            <p className="text-slate-600 text-lg">Escolha o tipo de registo</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {[
              { entity: 'clientes' as Entity, title: 'Clientes', icon: '👥', color: 'from-blue-500 to-indigo-600' },
              { entity: 'projetos' as Entity, title: 'Projetos', icon: '📁', color: 'from-emerald-500 to-teal-600' },
              { entity: 'utilizadores' as Entity, title: 'Utilizadores', icon: '👤', color: 'from-purple-500 to-pink-600' }
            ].map((item, index) => (
              <motion.div
                key={item.entity}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onClick={() => handleEntitySelect(item.entity)}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2 text-center">{item.title}</h3>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleBack}
              className="px-6 py-3 bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300 transition-colors duration-300"
            >
              ← Voltar
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'crud') {
    const entityData = getEntityData();
    const fields = getEntityFields();

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
              {selectedAction === 'adicionar' && `Adicionar ${selectedEntity}`}
              {selectedAction === 'modificar' && `Modificar ${selectedEntity}`}
              {selectedAction === 'eliminar' && `Eliminar ${selectedEntity}`}
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Lista de itens existentes */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
            >
              <h2 className="text-2xl font-bold text-slate-800 mb-6">
                {selectedEntity?.charAt(0).toUpperCase() + selectedEntity?.slice(1)} Existentes
              </h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {entityData.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-white/50 rounded-xl border border-white/30">
                    <div>
                      <h3 className="font-semibold text-slate-800">{item.nome}</h3>
                      <p className="text-sm text-slate-600">{item.email || `ID: ${item.id}`}</p>
                    </div>
                    <div className="flex gap-2">
                      {selectedAction === 'modificar' && (
                        <button
                          onClick={() => handleEdit(item)}
                          className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
                        >
                          Editar
                        </button>
                      )}
                      {selectedAction === 'eliminar' && (
                        <button
                          onClick={() => handleDelete(item)}
                          className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
                        >
                          Eliminar
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Formulário */}
            {(selectedAction === 'adicionar' || (selectedAction === 'modificar' && isEditing)) && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
              >
                <h2 className="text-2xl font-bold text-slate-800 mb-6">
                  {selectedAction === 'adicionar' ? 'Novo Registo' : 'Editar Registo'}
                </h2>
                <div className="space-y-4">
                  {fields.map((field) => (
                    <div key={field.key}>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        {field.label}
                      </label>
                      {field.type === 'select' ? (
                        <select
                          value={formData[field.key] || ''}
                          onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        >
                          <option value="">Selecione...</option>
                          {field.options?.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : field.type === 'checkbox' ? (
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData[field.key] || false}
                            onChange={(e) => setFormData({ ...formData, [field.key]: e.target.checked })}
                            className="mr-2 rounded"
                          />
                          {field.label}
                        </label>
                      ) : (
                        <input
                          type={field.type}
                          value={formData[field.key] || ''}
                          onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                      )}
                    </div>
                  ))}
                  
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={handleSubmit}
                      className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
                    >
                      {selectedAction === 'adicionar' ? 'Adicionar' : 'Guardar'}
                    </button>
                    {isEditing && (
                      <button
                        onClick={() => {
                          setIsEditing(false);
                          setFormData({});
                          setSelectedItem(null);
                        }}
                        className="px-6 py-3 bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300 transition-colors duration-300"
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={handleBack}
              className="px-6 py-3 bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300 transition-colors duration-300"
            >
              ← Voltar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}