import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

type Tone = 'blue' | 'green' | 'purple' | 'amber' | 'teal' | 'red' ;
type Status = 'Completado' | 'En proceso' | 'Pendiente' | 'Fallido';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
})
export class AdminDashboard {

  //   getMetricSoftClass(tone: Tone): string {
  //   const classes: Record<Tone, string> = {
  //     blue: 'bg-blue-50 text-blue-700 ring-blue-100',
  //     green: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  //     violet: 'bg-violet-50 text-violet-700 ring-violet-100',
  //     amber: 'bg-amber-50 text-amber-700 ring-amber-100',
  //     rose: 'bg-rose-50 text-rose-700 ring-rose-100',
  //   };

  //   return classes[tone];
  // }
  metrics = [
    {
      title: 'Total de reembolsos',
      value: '$24,580.00',
      trend: '12.5%',
      description: 'vs. semana anterior',
      icon: '$',
      tone: 'blue' as Tone,
      positive: true,
    },
    {
      title: 'Transacciones completadas',
      value: '1,248',
      trend: '8.3%',
      description: 'vs. semana anterior',
      icon: '✓',
      tone: 'green' as Tone,
      positive: true,
    },
    {
      title: 'Usuarios registrados',
      value: '532',
      trend: '15.7%',
      description: 'vs. semana anterior',
      icon: '👥',
      tone: 'purple' as Tone,
      positive: true,
    },
    {
      title: 'Transacciones pendientes',
      value: '45',
      trend: '4.2%',
      description: 'vs. semana anterior',
      icon: '◷',
      tone: 'amber' as Tone,
      positive: false,
    },
    {
      title: 'Tasa de éxito',
      value: '96.8%',
      trend: '2.1%',
      description: 'vs. semana anterior',
      icon: '🛡',
      tone: 'teal' as Tone,
      positive: true,
    },
  ];

  toneClasses: Record<Tone, any> = {
    blue: {
      icon: 'bg-blue-50 text-blue-600',
      line: 'bg-blue-500',
    },
    green: {
      icon: 'bg-green-50 text-green-600',
      line: 'bg-green-500',
    },
    purple: {
      icon: 'bg-purple-50 text-purple-600',
      line: 'bg-purple-500',
    },
    amber: {
      icon: 'bg-amber-50 text-amber-600',
      line: 'bg-amber-500',
    },
    teal: {
      icon: 'bg-teal-50 text-teal-600',
      line: 'bg-teal-500',
    },
    red: {
      icon: 'bg-red-50 text-red-600',
      line: 'bg-red-500',
    },
  };

  refundStats = [
    { label: 'Completados', value: '215', percent: '68.3%', color: 'bg-green-500' },
    { label: 'En proceso', value: '65', percent: '20.6%', color: 'bg-blue-500' },
    { label: 'Pendientes', value: '25', percent: '7.9%', color: 'bg-amber-500' },
    { label: 'Fallidos', value: '10', percent: '3.2%', color: 'bg-red-500' },
  ];

  quickSummary = [
    {
      label: 'Monto promedio de reembolso',
      value: '$178.75',
      trend: '6.4%',
      tone: 'blue' as Tone,
      positive: true,
    },
    {
      label: 'Tiempo promedio de resolución',
      value: '1.8 días',
      trend: '0.5 días',
      tone: 'amber' as Tone,
      positive: false,
    },
    {
      label: 'Comercios activos',
      value: '128',
      trend: '7.3%',
      tone: 'purple' as Tone,
      positive: true,
    },
    {
      label: 'Chargebacks recibidos',
      value: '12',
      trend: '20.0%',
      tone: 'green' as Tone,
      positive: false,
    },
  ];

  refunds: {
    id: string;
    user: string;
    amount: string;
    status: Status;
    date: string;
    store: string;
  }[] = [
    {
      id: '#RB-1025',
      user: 'juan.perez@email.com',
      amount: '$580.00',
      status: 'Completado',
      date: '15/06/2026 09:45 a. m.',
      store: 'Tienda Demo',
    },
    {
      id: '#RB-1024',
      user: 'maria.lopez@email.com',
      amount: '$240.00',
      status: 'En proceso',
      date: '15/06/2026 08:30 a. m.',
      store: 'Tech Store',
    },
    {
      id: '#RB-1023',
      user: 'carlos.ruiz@email.com',
      amount: '$125.00',
      status: 'Pendiente',
      date: '14/06/2026 06:15 p. m.',
      store: 'Market Plus',
    },
    {
      id: '#RB-1022',
      user: 'ana.gomez@email.com',
      amount: '$310.00',
      status: 'Fallido',
      date: '14/06/2026 04:20 p. m.',
      store: 'Fashion Outlet',
    },
  ];

  activities = [
    {
      title: 'Reembolso #RB-1025 completado',
      user: 'juan.perez@email.com',
      time: 'Hace 10 min',
      tone: 'green' as Tone,
      icon: '✓',
    },
    {
      title: 'Reembolso #RB-1024 en proceso',
      user: 'maria.lopez@email.com',
      time: 'Hace 35 min',
      tone: 'blue' as Tone,
      icon: '◷',
    },
    {
      title: 'Reembolso #RB-1023 pendiente',
      user: 'carlos.ruiz@email.com',
      time: 'Hace 1 hora',
      tone: 'amber' as Tone,
      icon: '!',
    },
    {
      title: 'Reembolso #RB-1022 fallido',
      user: 'ana.gomez@email.com',
      time: 'Hace 2 horas',
      tone: 'red' as Tone,
      icon: '×',
    },
  ];

  statusClasses: Record<Status, string> = {
    Completado: 'bg-green-50 text-green-700',
    'En proceso': 'bg-blue-50 text-blue-700',
    Pendiente: 'bg-amber-50 text-amber-700',
    Fallido: 'bg-red-50 text-red-700',
  };

  donutStyle =
    'conic-gradient(#22c55e 0 68%, #3b82f6 68% 88%, #f59e0b 88% 96%, #ef4444 96% 100%)';


  }
