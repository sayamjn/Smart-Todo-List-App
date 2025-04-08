export const formatDateTimeLocal = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };
  
  export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  export const getTimeRemaining = (deadline: string): {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    total: number;
    isPast: boolean;
  } => {
    const total = new Date(deadline).getTime() - new Date().getTime();
    const isPast = total <= 0;
    
    if (isPast) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0, isPast };
    }
    
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    
    return { days, hours, minutes, seconds, total, isPast };
  };
  
  export const formatTimeRemaining = (deadline: string): string => {
    const { days, hours, minutes, isPast } = getTimeRemaining(deadline);
    
    if (isPast) {
      return 'Past deadline';
    }
    
    if (days > 0) {
      return `${days}d ${hours}h remaining`;
    }
    
    if (hours > 0) {
      return `${hours}h ${minutes}m remaining`;
    }
    
    return `${minutes}m remaining`;
  };
  
  export const getDefaultDeadline = (): string => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return formatDateTimeLocal(date);
  };