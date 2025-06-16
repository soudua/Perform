import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { createApiUrl, apiConfig } from '../utils/apiConfig';
import Autocomplete from '@mui/joy/Autocomplete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';


export default function PerformClientes() {
  const { user_id } = useOutletContext<{ user_id: number | null }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [projectOptions, setProjectOptions] = useState<{ label: string; id: number }[]>([]);
  const [selectedProject, setSelectedProject] = useState<{ label: string; id: number } | null>(null);
  const [activeButton, setActiveButton] = useState<string | null>(null);
 
  const images = ['/graph2.png', '/piecharts1.png', '/faturação.png'];

  function createData(
    name: string,
    horasregistadas: number,
  ) {
    return { name, horasregistadas };
  }

    const rows = [
    createData('Duarte', 159),
    createData('João', 237),
    createData('Joana', 262),
    createData('Carlos', 305),
    createData('Diana', 356),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!user_id) return;
    axios.get(createApiUrl(apiConfig.endpoints.projectsByUser), { params: { user_id } })
      .then(res => {
        const projects = res.data?.projects || [];
        setProjectOptions(projects.map((name: string, idx: number) => ({ label: name, id: idx })));
      })
      .catch(() => setProjectOptions([]));
  }, [user_id]);

  useEffect(() => {
    if (projectOptions.length > 0 && !selectedProject) {
      setSelectedProject(projectOptions[0]);
    }
  }, [projectOptions]);

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName === activeButton ? null : buttonName);
  };

  return (
    <>
      <div className="flex flex-row items-center justify-center gap-4 w-full">
        <div className='w-2/4 text-lg h-16 bg-[#FFFFF2] border-1 shadow-lg rounded-full font-bold text-gray-500'>
          <div className='flex justify-around items-center h-full w-full px-4'>
            <div className='flex flex-row gap-3'>
              <div>
                Projeto: 
              </div>
              <div>
                <Autocomplete
                  placeholder="Projeto..."
                  options={projectOptions}
                  value={selectedProject}
                  onChange={(_, v) => setSelectedProject(v)}
                  sx={{ width: 200 }}
                />
              </div>
            </div>
            <div>Estado: Ativo</div>
          </div>
        </div>
        <div className='w-1/4 h-16 bg-[#FFFFF2] border-1 shadow-lg rounded-full flex items-center justify-center overflow-hidden relative'>
          <AnimatePresence mode="wait">
            <motion.img
              key={images[currentImageIndex]}
              src={images[currentImageIndex]}
              alt="slider"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="h-12 object-contain absolute"
            />
          </AnimatePresence>
        </div>
      </div>
      
      <div className='flex justify-center pt-10 w-full gap-8'>
        <motion.button 
          className='flex items-center justify-around w-1/6 h-40 bg-white shadow-lg border-2 border-white rounded-2xl'
          whileHover={{ y: -5 }}
          whileTap={{ y: 0 }}
          animate={{ y: activeButton === 'status' ? -10 : 0 }}
          onClick={() => handleButtonClick('status')}
        >
          <div className='text-gray-500 text-2xl font-bold'>Status</div><div className='text-4xl'>🎯</div> 
        </motion.button>
        
        <motion.button
          className='flex items-center justify-around w-1/6 h-40 bg-white shadow-lg border-2 border-white rounded-2xl'
          whileHover={{ y: -5 }}
          whileTap={{ y: 0 }}
          animate={{ y: activeButton === 'faturacao' ? -10 : 0 }}
          onClick={() => handleButtonClick('faturacao')}
        >
          <div className='text-gray-500 text-2xl font-bold'>Faturação</div><div className='text-4xl'>💲</div> 
        </motion.button>
        
        <motion.button
          className='flex items-center justify-around w-1/6 h-40 bg-white shadow-lg border-2 border-white rounded-2xl'
          whileHover={{ y: -5 }}
          whileTap={{ y: 0 }}
          animate={{ y: activeButton === 'risks' ? -10 : 0 }}
          onClick={() => handleButtonClick('risks')}
        >
          <div className='text-gray-500 text-2xl font-bold'>Risks</div><div className='text-4xl'>⌛</div> 
        </motion.button>
        
        <motion.button
          className='flex items-center justify-around w-1/6 h-40 bg-white shadow-lg border-2 border-white rounded-2xl'
          whileHover={{ y: -5 }}
          whileTap={{ y: 0 }}
          animate={{ y: activeButton === 'cpi' ? -10 : 0 }}
          onClick={() => handleButtonClick('cpi')}
        >
          <div className='text-gray-500 text-2xl font-bold'>Cpi</div><div className='text-4xl'>📈</div> 
        </motion.button>
      </div>

      {activeButton ? (
        <div className='flex flex-row justify-around'>
          <div className='mt-8 p-6 mx-auto w-4/5'>
            {activeButton === 'status' && (
              <div className='flex flex-row justify-around gap-4 w-full'>
                <div className='text-gray-600 w-full h-5/6 bg-white p-6 rounded-2xl shadow-lg '>
                  <div className='text-lg font-bold text-black mb-6 text-left'>Horas Registadas</div>
                  <div className='w-full'>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 350 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Pessoas</TableCell>
                            <TableCell align="right">Horas Registadas</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row) => (
                            <TableRow 
                              key={row.name}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                {row.name}
                              </TableCell>
                              <TableCell align="right">{row.horasregistadas}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                  <div className='pt-10 text-left'>
                    <div className='text-xl font-bold text-gray-500'>Maior Horas:</div>
                    <div className='text-4xl font-bold text-black'>356</div>
                  </div>
                </div>
                <div className='bg-white w-full rounded-2xl shadow-lg'>
                  <div className='font-bold text-lg pt-4 pl-6 text-black'>Distribuição de horas e recursos</div>
                  <div className='pt-8'>
                    <BarChart
                      xAxis={[{ data: ['group A', 'group B', 'group C'] }]}
                      series={[{ data: [4, 3, 5] }]}
                      height={300}
                    />
                  </div>
                  <div className='pt-14'>
                    <div className='pl-4 text-lg font-bold text-gray-500'>Maior Custo de Colaborador</div>
                    <div className='pl-4 text-4xl font-bold'>550</div>
                  </div>
                </div>
              </div>
            )}
            {activeButton === 'faturacao' && (
              <div className='flex flex-row justify-center gap-9'>
                <div className='w-2/5'>
                <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col w-full">
                  <div className='justify-start font-bold text-xl'>Faturação</div>
                  <div className='flex justify-center items-center'>
                    <PieChart
                      series={[
                        {
                          data: [
                            { id: 0, value: 10, label: 'Faturado' },
                            { id: 1, value: 15, label: 'Não Faturado' },
                          ],
                        },
                      ]}
                      width={200}
                      height={350}
                    />
                  </div>
                  <div className='font-bold text-xl text-gray-500'>Horas faturaveis</div>
                  <div className='font-bold text-4xl'>500</div>
                </div>
                
                </div>
                
                <div className='bg-white rounded-2xl shadow-lg p-4 w-2/5'>
                  <div className='font-bold text-lg'>Distribuição de Horas</div>
                  <div className='flex flex-row'>
                    <div>
                      <BarChart
                        xAxis={[{ data: ['Duarte', 'João', 'Joana'] }]}
                        series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                        height={300}
                      />
                    </div>
                    <div className='flex flex-col justify-center'>
                      <div className='flex flex-row'><div className='w-5 h-5 bg-blue-700 rounded-full border-2 border-gray-400'></div><div className='font-semibold'>- Horas Faturáveis</div></div>
                      <div className='flex flex-row'><div className='w-5 h-5 bg-yellow-400 rounded-full border-2 border-gray-400'></div><div className='font-semibold'>- Horas Extra</div></div>
                      <div className='flex flex-row'><div className='w-5 h-5 bg-red-500 rounded-full border-2 border-gray-400'></div><div className='font-semibold'>- Horas Normais</div></div>
                    </div>
                  </div>
                  <div className='pt-11 font-bold text-lg text-gray-500'>Faturável maior horas</div>
                  <div className='text-4xl font-bold'>500</div>
                </div>
              </div>
            )}
            {activeButton === 'risks' && (
              <div className='w-full flex flex-row gap-3 pl-8'>
                
                <div className='bg-white justify-center w-[570px] rounded-2xl shadow-lg '>
                <div className='text-gray-500 text-lg font-bold pl-3'>Budget/Duração do Projeto</div>                
                <div className='w-[480px]'>
                  <LineChart
      xAxis={[{ 
        scaleType: 'band', 
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] 
      }]}
      series={[
        {
          data: [2, 5.5, 2, 8.5, 1.5, 5],
          area: true,
        },
      ]}
      height={300}
    />
                   </div>
                   </div>
                   <div className='w-[580px] bg-white rounded-2xl shadow-lg '>
                    <div className='text-gray-500 text-lg font-bold pl-3'>Dados</div>
                    <div>

                       <TableContainer component={Paper}>
      <Table sx={{ minWidth: 50 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">data de inicio</TableCell>
            <TableCell align="right">data fim</TableCell>
            <TableCell align="right">budget</TableCell>
            <TableCell align="right">risco</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">2024-01-01</TableCell>
              <TableCell align="right">2024-12-31</TableCell>
              <TableCell align="right">50000€</TableCell>
              <TableCell align="right">Baixo</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
                    </div>

                    </div>
                
              </div>
            )}
            {activeButton === 'cpi' && (
              <div className='flex flex-row justify-center gap-9'>
                <div className='flex flex-col w-3/6 space-y-36'>
                  <div className='w-5/6 h-48 bg-white shadow-lg rounded-2xl p-4'>
                    <div className='font-bold text-lg text-gray-500 mb-2'>CPI Agora</div>
                    <div className='flex flex-row items-center justify-between'>
                      <div className='text-4xl font-bold'>0.8</div>
                      <div className='w-24 h-24'>
                        <img src="/graphimages.png" alt="CPI Graph" className='w-full h-full object-contain' />
                      </div>
                    </div>
                    <div className='flex flex-row gap-4'>
                      <div className='text-sm text-red-600'>+2.6% </div><div className='text-sm text-gray-500'>Ultimos 7 dias</div>
                    </div>
                  </div>
                  <div className='w-5/6 h-32 bg-white shadow-lg rounded-2xl'>
                    <div className='font-bold text-lg'>Legenda CPI</div>
                    <div className='flex flex-row justify-around pt-4'>
                      <div className='text-xl'>CPI &lt; 1</div><div className='font-bold'>Projeto dentro do budget</div>
                    </div>
                    <div className='flex flex-row justify-around pt-4'>
                      <div className='text-xl'>CPI &lt; 1</div><div className='font-bold'>Projeto abaixo do budget</div>
                    </div>
                  </div>
                </div>
                <div className='bg-white rounded-2xl shadow-lg p-4 w-2/5'>
                  <div className='font-bold text-xl'>CPI</div>
                  <div>
                    <LineChart
                      xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                      series={[
                        {
                          data: [2, 5.5, 2, 8.5, 1.5, 5],
                          area: true,
                        },
                      ]}
                      height={300}
                    />
                  </div>
                  <div className='pt-11 font-bold text-lg text-gray-500'>CPI Menor</div>
                  <div className='text-4xl font-bold'>0.6</div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className='w-full pt-20'>
          <div className='flex justify-around'>
            <div className='w-1/6 h-[150px] bg-white shadow-lg rounded-2xl text-lg font-bold text-gray-500'>Horas Registadas<div className='justify-around flex flex-row'><div className='flex items-center justify-center pt-5 text-3xl text-black'>70 %</div> <img src="/graphimages.png" alt="CPI Graph" className='w-[50px] h-[50px] object-contain' /></div><div className='flex flex-row gap-1 justify-center pt-2'><div className='text-sm flex justify-center text-green-500'>+2.6%</div><div className='text-sm text-gray-500 font-semibold'>da semana passada</div></div></div>
            <div className='w-1/6 h-[150px] bg-white shadow-lg rounded-2xl text-lg font-bold text-gray-500'>Faturação<div className='justify-around flex flex-row'><div className='flex items-center justify-center pt-5 text-3xl text-black'>50 %</div> <img src="/graphimages.png" alt="CPI Graph" className='w-[50px] h-[50px] object-contain' /></div><div className='flex flex-row gap-1 justify-center pt-2'><div className='text-sm flex justify-center text-green-500'>+8%</div><div className='text-sm text-gray-500 font-semibold'>da semana passada</div></div></div>
            <div className='w-1/6 h-[150px] bg-white shadow-lg rounded-2xl text-lg font-bold text-gray-500'>Riscos<div className='justify-around flex flex-row'><div className='flex items-center justify-center pt-5 text-3xl text-black'>75 %</div> <img src="/graphimages.png" alt="CPI Graph" className='w-[50px] h-[50px] object-contain' /></div><div className='flex flex-row gap-1 justify-center pt-2'><div className='text-sm flex justify-center text-red-500'>+5%</div><div className='text-sm text-gray-500 font-semibold'>da semana passada</div></div></div>
            <div className='w-1/6 h-[150px] bg-white shadow-lg rounded-2xl text-lg font-bold text-gray-500'>Cpi<div className='justify-around flex flex-row'><div className='flex items-center justify-center pt-5 text-3xl text-black'>0.7</div> <img src="/graphimages.png" alt="CPI Graph" className='w-[50px] h-[50px] object-contain' /></div><div className='flex flex-row gap-1 justify-center pt-2'><div className='text-sm flex justify-center text-green-500'>-0.2</div><div className='text-sm text-gray-500 font-semibold'>da semana passada</div></div></div>
          </div>
        </div>
      )}
    </>
  );
}