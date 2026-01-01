interface ErrorConfig {
  titleFA: string;
  messageFA: string;
  icon: string;
  bgColor: string;
  borderColor: string;
}

const errorConfigs: Record<string, ErrorConfig> = {
  '400': {
    titleFA: 'درخواست نادرست',
    messageFA: 'سرور نتوانست درخواست شما را درک کند.',
    icon: '❌',
    bgColor: 'bg-amber-500/20',
    borderColor: 'border-amber-500/50',
  },
  '401': {
    titleFA: 'عدم اجازه دسترسی',
    messageFA: 'برای دسترسی به این منبع، احراز هویت لازم است.',
    icon: '🔐',
    bgColor: 'bg-red-500/20',
    borderColor: 'border-red-500/50',
  },
  '403': {
    titleFA: 'ممنوع',
    messageFA: 'شما اجازه دسترسی به این منبع را ندارید.',
    icon: '🚫',
    bgColor: 'bg-orange-500/20',
    borderColor: 'border-orange-500/50',
  },
  '404': {
    titleFA: 'صفحه یافت نشد',
    messageFA: 'صفحه‌ای که دنبال می‌گردید وجود ندارد.',
    icon: '🔍',
    bgColor: 'bg-cyan-500/20',
    borderColor: 'border-cyan-500/50',
  },
  '408': {
    titleFA: 'زمان درخواست پایان یافت',
    messageFA: 'زمان انجام درخواست شما تمام شد.',
    icon: '⏱️',
    bgColor: 'bg-amber-500/20',
    borderColor: 'border-amber-500/50',
  },
  '429': {
    titleFA: 'درخواست‌های بیش از حد',
    messageFA: 'شما تعداد درخواست‌های بیش‌ازحدی در مدت کوتاهی ارسال کرده‌اید.',
    icon: '⚠️',
    bgColor: 'bg-orange-500/20',
    borderColor: 'border-orange-500/50',
  },
  '500': {
    titleFA: 'خطای داخلی سرور',
    messageFA: 'سرور با خطای غیرمنتظره‌ای مواجه شد.',
    icon: '⚡',
    bgColor: 'bg-red-500/20',
    borderColor: 'border-red-500/50',
  },
  '501': {
    titleFA: 'پیاده‌سازی نشده',
    messageFA: 'این ویژگی هنوز بر روی سرور پیاده‌سازی نشده است.',
    icon: '🔨',
    bgColor: 'bg-slate-500/20',
    borderColor: 'border-slate-500/50',
  },
  '502': {
    titleFA: 'درگاه نادرست',
    messageFA: 'پاسخ نادرست از سرور بالادستی.',
    icon: '🔗',
    bgColor: 'bg-orange-500/20',
    borderColor: 'border-orange-500/50',
  },
  '503': {
    titleFA: 'سرویس در دسترس نیست',
    messageFA: 'سرور به‌طور موقتی برای نگهداری و تعمیر خاموش است.',
    icon: '🔄',
    bgColor: 'bg-yellow-500/20',
    borderColor: 'border-yellow-500/50',
  },
  '504': {
    titleFA: 'زمان انتظار درگاه تمام شد',
    messageFA: 'سرور بالادستی به‌موقع پاسخ نداد.',
    icon: '⏳',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/50',
  },
  '505': {
    titleFA: 'ورژن HTTP پشتیبانی نمی‌شود',
    messageFA: 'ورژن HTTP استفاده‌شده پشتیبانی نمی‌شود.',
    icon: '📡',
    bgColor: 'bg-red-500/20',
    borderColor: 'border-red-500/50',
  },
};

interface StaticErrorDisplayProps {
  statusCode: string;
}

export default function StaticErrorDisplay({ statusCode }: StaticErrorDisplayProps) {
  const config = errorConfigs[statusCode] || errorConfigs['500'];

  return (
    <div className="space-y-6">
      {/* Icon */}
      <div className="text-center">
        <div className="text-8xl mb-4">{config.icon}</div>
      </div>

      {/* Main Error Card */}
      <div className={`${config.bgColor} border ${config.borderColor} rounded-2xl backdrop-blur-md p-8 text-center space-y-4`}>
        {/* Status Code */}
        <h1 className="text-6xl font-bold text-white opacity-80">{statusCode}</h1>

        {/* Title */}
        <h2 className="text-3xl font-bold text-white">{config.titleFA}</h2>

        {/* Message */}
        <p className="text-white/80 text-lg leading-relaxed">{config.messageFA}</p>
      </div>

      {/* Info Section */}
      <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md p-6 text-center">
        <p className="text-white/60 text-sm mb-4">اطلاعات درخواست:</p>
        <div className="space-y-2 text-white/50 text-xs font-mono">
          <p>Status Code: {statusCode}</p>
          <p>Timestamp: {new Date().toISOString()}</p>
          <p>Time: {new Date().toLocaleTimeString('fa-IR')}</p>
        </div>
      </div>

      {/* Help Text */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl backdrop-blur-md p-6 text-center">
        <p className="text-white/70 text-sm leading-relaxed">
          درخواست خود را بعداً تکرار کنید یا با پشتیبانی تماس بگیرید.
        </p>
        <p className="text-white/50 text-xs mt-3">
          Please try again later or contact our support team.
        </p>
      </div>
    </div>
  );
}
