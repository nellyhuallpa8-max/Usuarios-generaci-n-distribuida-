import React, { useState, useMemo } from 'react';
import {
  Building2,
  Search,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  User,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export interface InstallerCompany {
  numero: number;
  empresa: string;
  representante: string;
  direccion: string;
  telefono: string;
  correo: string;
  habilitadoPara: string;
  ciudad: 'Trinidad' | 'Riberalta' | 'Beni' | 'Santa Cruz' | 'La Paz' | 'Cochabamba';
}

export const APPROVED_INSTALLERS_DATA: InstallerCompany[] = [
  {
    numero: 1,
    empresa: 'CASA SOLAR',
    representante: 'Tupaj Arturo Camilo Vargas Vega',
    direccion: 'Av. Santa Cruz N° 380, Zona Central – Trinidad',
    telefono: '72221009',
    correo: 'casasolartdd@gmail.com',
    habilitadoPara: 'Elaboración y ejecución',
    ciudad: 'Trinidad',
  },
  {
    numero: 2,
    empresa: 'DATEC LTDA',
    representante: 'Blanca Rosa Salces Cuellar',
    direccion: 'Calle Velasco N° 213, Zona Central, entre Pari y Suarez de Figueroa – Santa Cruz',
    telefono: '3151100',
    correo: 'ovacadiez@datec.com.bo',
    habilitadoPara: 'Elaboración y ejecución',
    ciudad: 'Santa Cruz',
  },
  {
    numero: 3,
    empresa: 'ARMOCORP S.R.L.',
    representante: 'Samantha Montenegro Velasquez',
    direccion: 'B/2 de Abril, esquina calle 3 y 4, Santa Cruz',
    telefono: '72151577',
    correo: 'contabilidad@armosolar.com.bo',
    habilitadoPara: 'Elaboración y ejecución',
    ciudad: 'Santa Cruz',
  },
  {
    numero: 4,
    empresa: 'SOLARIA S.R.L.',
    representante: 'Luis Ovando Banzer',
    direccion: 'Avenida Iberica, entre Radial Castilla y Mangalito, Condominio Macarena, Santa Cruz',
    telefono: '78090211',
    correo: 'informacion@solariabo.com',
    habilitadoPara: 'Elaboración y ejecución',
    ciudad: 'Santa Cruz',
  },
  {
    numero: 5,
    empresa: 'TOTAL RADIO SYSTEMS BOLIVIA TRS LTDA',
    representante: 'Adriana Alicia Vaca Dulcich',
    direccion: 'Zona Miraflores, calle Juan Manuel Loza N° 1906 – La Paz',
    telefono: '2225060',
    correo: 'nrios@totalradios.com',
    habilitadoPara: 'Elaboración y ejecución',
    ciudad: 'La Paz',
  },
  {
    numero: 6,
    empresa: 'MCLXELETTBO SRL',
    representante: 'Ramiro Almendras Diaz',
    direccion: 'Calle Dr. Juan de Dios Martinez, esquina Dr. Antonio Vaca Diez, Riberalta',
    telefono: '75742732',
    correo: 'ramiroalmendras@gmail.com',
    habilitadoPara: 'Elaboración y ejecución',
    ciudad: 'Riberalta',
  },
  {
    numero: 7,
    empresa: 'ENERVIDA',
    representante: 'Boris Mario Ardaya Limachi',
    direccion: 'Calle Condorini N° 118, Zona Marquirivi, La Paz, Bolivia',
    telefono: '71595791',
    correo: 'boris.ardaya@enervida.info',
    habilitadoPara: 'Elaboración y ejecución',
    ciudad: 'La Paz',
  },
  {
    numero: 8,
    empresa: 'SERVICIOS INTEGRALES DE ENERGIA S.A.',
    representante: 'Osvaldo Ivailo Peña Treneva',
    direccion: 'Av. Melchor Perez de Olguin N° 2848, Cochabamba, Bolivia',
    telefono: '67406290',
    correo: 'info@sie-sa.com',
    habilitadoPara: 'Elaboración y ejecución',
    ciudad: 'Cochabamba',
  },
  {
    numero: 9,
    empresa: 'ROMERO & SANTOS ENERGY S.R.L.',
    representante: 'David Rodrigo Romero Almendras',
    direccion: 'Calle Reyes entre Oscar Unzaga de la Vega y Rotary Internacional N° 639, Beni, Bolivia',
    telefono: '76435122',
    correo: 'd.rodrigoromeroa@gmail.com',
    habilitadoPara: 'Elaboración y ejecución',
    ciudad: 'Beni',
  },
  {
    numero: 10,
    empresa: 'DESMART LTDA.',
    representante: 'Juan Carlos Pusarico Rodriguez',
    direccion: 'Zona Kantutani, Av. Capitan Ravelo Nro. 2007, Edif. Taborga I, piso: Mezanine, La Paz, Bolivia',
    telefono: '72191566',
    correo: 'andreina@desmart.net',
    habilitadoPara: 'Elaboración y ejecución',
    ciudad: 'La Paz',
  },
  {
    numero: 11,
    empresa: 'ENERTECH',
    representante: 'Jhonny Nelson Caballero Vargas',
    direccion: 'Av. Santa Cruz N° 2063, Edificio Boheme, Of. 4B, Zona Queru Qheru, Cochabamba, Bolivia',
    telefono: '76285555',
    correo: 'ncaballero.enertech@gmail.com',
    habilitadoPara: 'Elaboración y ejecución',
    ciudad: 'Cochabamba',
  },
  {
    numero: 12,
    empresa: 'ENERSOL S.A.',
    representante: 'Javier Eduardo Lozada Wichtendahl',
    direccion: 'Av. Doble Vía a la Guardia Km. 3 ½, N° 4150, Zona Sur Oeste',
    telefono: '77351594',
    correo: 'juanita@enersol-sa.com',
    habilitadoPara: 'Elaboración y ejecución',
    ciudad: 'Santa Cruz',
  },
];

export const ApprovedInstallers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'TODOS' | 'BENI' | 'SANTA_CRUZ' | 'LA_PAZ' | 'COCHABAMBA'>('TODOS');

  const filteredInstallers = useMemo(() => {
    return APPROVED_INSTALLERS_DATA.filter((item) => {
      if (selectedFilter === 'BENI') {
        if (!['Trinidad', 'Riberalta', 'Beni'].includes(item.ciudad)) return false;
      } else if (selectedFilter === 'SANTA_CRUZ' && item.ciudad !== 'Santa Cruz') {
        return false;
      } else if (selectedFilter === 'LA_PAZ' && item.ciudad !== 'La Paz') {
        return false;
      } else if (selectedFilter === 'COCHABAMBA' && item.ciudad !== 'Cochabamba') {
        return false;
      }

      if (!searchTerm.trim()) return true;
      const q = searchTerm.toLowerCase();
      return (
        item.empresa.toLowerCase().includes(q) ||
        item.representante.toLowerCase().includes(q) ||
        item.direccion.toLowerCase().includes(q) ||
        item.telefono.includes(q) ||
        item.correo.toLowerCase().includes(q)
      );
    });
  }, [searchTerm, selectedFilter]);

  return (
    <section id="empresas-instaladoras" className="py-8 sm:py-10 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#003B71] text-white flex items-center justify-center shrink-0">
              <Building2 className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-[#003B71] tracking-tight">
                  Empresas Instaladoras Aprobadas
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-[#003B71]">
                  12 Habilitadas
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-none mt-0.5">
                Autorizadas por ENDE DELBENI S.A.M. para la elaboración y ejecución de proyectos solares.
              </p>
            </div>
          </div>

          {/* Inline Compact Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar instalador..."
              className="w-full h-8 pl-8 pr-3 rounded-xl bg-white border border-slate-300 text-xs focus:border-[#003B71] outline-none transition"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-slate-600 px-1.5 py-0.5 bg-slate-100 rounded"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Tight Filter Pills Row */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3 text-[11px]">
          <span className="text-slate-400 font-medium text-[10px] uppercase mr-1">Filtrar:</span>
          <button
            onClick={() => setSelectedFilter('TODOS')}
            className={`px-2.5 py-1 rounded-lg font-bold transition ${
              selectedFilter === 'TODOS'
                ? 'bg-[#003B71] text-white'
                : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            Todas (12)
          </button>
          <button
            onClick={() => setSelectedFilter('BENI')}
            className={`px-2.5 py-1 rounded-lg font-black transition flex items-center gap-1 ${
              selectedFilter === 'BENI'
                ? 'bg-amber-400 text-slate-950 shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>En el Beni (Trinidad / Riberalta)</span>
          </button>
          <button
            onClick={() => setSelectedFilter('SANTA_CRUZ')}
            className={`px-2.5 py-1 rounded-lg font-bold transition ${
              selectedFilter === 'SANTA_CRUZ'
                ? 'bg-[#003B71] text-white'
                : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            Santa Cruz
          </button>
          <button
            onClick={() => setSelectedFilter('LA_PAZ')}
            className={`px-2.5 py-1 rounded-lg font-bold transition ${
              selectedFilter === 'LA_PAZ'
                ? 'bg-[#003B71] text-white'
                : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            La Paz
          </button>
          <button
            onClick={() => setSelectedFilter('COCHABAMBA')}
            className={`px-2.5 py-1 rounded-lg font-bold transition ${
              selectedFilter === 'COCHABAMBA'
                ? 'bg-[#003B71] text-white'
                : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            Cochabamba
          </button>
        </div>

        {/* Compact Table View with Fixed Maximum Height Scrollable Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="max-h-72 sm:max-h-80 overflow-y-auto overflow-x-auto">
            <table className="w-full text-left border-collapse text-[11px] sm:text-xs">
              <thead className="sticky top-0 z-10 bg-[#003B71] text-white font-bold uppercase text-[10px] tracking-wider shadow-xs">
                <tr>
                  <th className="py-2 px-2.5 text-center w-8">N°</th>
                  <th className="py-2 px-3">Empresa</th>
                  <th className="py-2 px-3">Representante</th>
                  <th className="py-2 px-3">Dirección</th>
                  <th className="py-2 px-2.5 text-center">Teléfono</th>
                  <th className="py-2 px-3">Correo</th>
                  <th className="py-2 px-2.5 text-center">Habilitación</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredInstallers.map((inst, index) => {
                  const isBeni = ['Trinidad', 'Riberalta', 'Beni'].includes(inst.ciudad);
                  const isEven = index % 2 === 0;

                  return (
                    <tr
                      key={inst.numero}
                      className={`transition-colors hover:bg-amber-50/70 ${
                        isEven ? 'bg-slate-50/60' : 'bg-white'
                      }`}
                    >
                      {/* N° */}
                      <td className="py-1.5 px-2.5 text-center font-bold text-slate-400">
                        {inst.numero}
                      </td>

                      {/* Empresa */}
                      <td className="py-1.5 px-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span className="font-extrabold text-[#003B71]">
                            {inst.empresa}
                          </span>
                          {isBeni && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-amber-400 text-slate-950 uppercase">
                              {inst.ciudad}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Representante */}
                      <td className="py-1.5 px-3 text-slate-600 truncate max-w-[170px]" title={inst.representante}>
                        {inst.representante}
                      </td>

                      {/* Dirección */}
                      <td className="py-1.5 px-3 text-slate-500 truncate max-w-[200px]" title={inst.direccion}>
                        {inst.direccion}
                      </td>

                      {/* Teléfono */}
                      <td className="py-1.5 px-2.5 text-center whitespace-nowrap">
                        <a
                          href={`tel:${inst.telefono}`}
                          className="font-bold text-emerald-700 hover:text-emerald-900 hover:underline flex items-center justify-center gap-1"
                        >
                          <Phone className="w-2.5 h-2.5 text-emerald-600" />
                          <span>{inst.telefono}</span>
                        </a>
                      </td>

                      {/* Correo */}
                      <td className="py-1.5 px-3 truncate max-w-[160px]">
                        <a
                          href={`mailto:${inst.correo}`}
                          className="text-sky-700 hover:underline flex items-center gap-1"
                          title={inst.correo}
                        >
                          <Mail className="w-2.5 h-2.5 text-sky-500 shrink-0" />
                          <span className="truncate">{inst.correo}</span>
                        </a>
                      </td>

                      {/* Habilitación */}
                      <td className="py-1.5 px-2.5 text-center whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600 shrink-0" />
                          <span>Habilitada</span>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Micro Footer bar */}
          <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>
              Mostrando <strong>{filteredInstallers.length}</strong> de 12 empresas registradas
            </span>
            <span className="text-[10px] text-slate-400">
              Desplázate verticalmente para ver la lista completa
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
