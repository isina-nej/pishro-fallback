'use client';

import { motion } from 'framer-motion';
import ErrorIcon from './ErrorIcon';

interface ErrorConfig {
  title: string;
  titleFA: string;
  message: string;
  messageFA: string;
  icon: string;
  accentColor: string;
  bgGradient: string;
}

const errorConfigs: Record<string, ErrorConfig> = {
  // 4xx Client Errors
  '400': {
    title: 'Bad Request',
    titleFA: 'درخواست نادرست',
    message: 'The request could not be understood by the server.',
    messageFA: 'سرور نتوانست درخواست شما را درک کند.',
    icon: '❌',
    accentColor: 'from-amber-400 to-yellow-500',
    bgGradient: 'bg-gradient-to-br from-amber-500/10 to-yellow-500/5',
  },
  '401': {
    title: 'Unauthorized',
    titleFA: 'عدم اجازه دسترسی',
    message: 'Authentication is required to access this resource.',
    messageFA: 'برای دسترسی به این منبع، احراز هویت لازم است.',
    icon: '🔐',
    accentColor: 'from-red-400 to-rose-500',
    bgGradient: 'bg-gradient-to-br from-red-500/10 to-rose-500/5',
  },
  '403': {
    title: 'Forbidden',
    titleFA: 'ممنوع',
    message: 'You do not have permission to access this resource.',
    messageFA: 'شما اجازه دسترسی به این منبع را ندارید.',
    icon: '🚫',
    accentColor: 'from-orange-400 to-red-500',
    bgGradient: 'bg-gradient-to-br from-orange-500/10 to-red-500/5',
  },
  '404': {
    title: 'Not Found',
    titleFA: 'صفحه یافت نشد',
    message: 'The page you are looking for does not exist.',
    messageFA: 'صفحه‌ای که دنبال می‌گردید وجود ندارد.',
    icon: '🔍',
    accentColor: 'from-cyan-400 to-blue-500',
    bgGradient: 'bg-gradient-to-br from-cyan-500/10 to-blue-500/5',
  },
  '408': {
    title: 'Request Timeout',
    titleFA: 'زمان درخواست پایان یافت',
    message: 'The request took too long to complete.',
    messageFA: 'زمان انجام درخواست شما تمام شد.',
    icon: '⏱️',
    accentColor: 'from-amber-400 to-orange-500',
    bgGradient: 'bg-gradient-to-br from-amber-500/10 to-orange-500/5',
  },
  '429': {
    title: 'Too Many Requests',
    titleFA: 'درخواست‌های بیش از حد',
    message: 'You have sent too many requests in a short time.',
    messageFA: 'شما تعداد درخواست‌های بیش‌ازحدی در مدت کوتاهی ارسال کرده‌اید.',
    icon: '⚠️',
    accentColor: 'from-orange-400 to-red-500',
    bgGradient: 'bg-gradient-to-br from-orange-500/10 to-red-500/5',
  },
  // 5xx Server Errors
  '500': {
    title: 'Internal Server Error',
    titleFA: 'خطای داخلی سرور',
    message: 'The server encountered an unexpected error.',
    messageFA: 'سرور با خطای غیرمنتظره‌ای مواجه شد.',
    icon: '⚡',
    accentColor: 'from-red-400 to-red-600',
    bgGradient: 'bg-gradient-to-br from-red-500/10 to-red-600/5',
  },
  '501': {
    title: 'Not Implemented',
    titleFA: 'پیاده‌سازی نشده',
    message: 'This feature is not yet implemented on the server.',
    messageFA: 'این ویژگی هنوز بر روی سرور پیاده‌سازی نشده است.',
    icon: '🔨',
    accentColor: 'from-slate-400 to-slate-600',
    bgGradient: 'bg-gradient-to-br from-slate-500/10 to-slate-600/5',
  },
  '502': {
    title: 'Bad Gateway',
    titleFA: 'درگاه نادرست',
    message: 'Invalid response from the upstream server.',
    messageFA: 'پاسخ نادرست از سرور بالادستی.',
    icon: '🔗',
    accentColor: 'from-orange-400 to-red-500',
    bgGradient: 'bg-gradient-to-br from-orange-500/10 to-red-500/5',
  },
  '503': {
    title: 'Service Unavailable',
    titleFA: 'سرویس در دسترس نیست',
    message: 'The server is temporarily down for maintenance.',
    messageFA: 'سرور به‌طور موقتی برای نگهداری و تعمیر خاموش است.',
    icon: '🔄',
    accentColor: 'from-yellow-400 to-orange-500',
    bgGradient: 'bg-gradient-to-br from-yellow-500/10 to-orange-500/5',
  },
  '504': {
    title: 'Gateway Timeout',
    titleFA: 'زمان انتظار درگاه تمام شد',
    message: 'The upstream server did not respond in time.',
    messageFA: 'سرور بالادستی به‌موقع پاسخ نداد.',
    icon: '⏳',
    accentColor: 'from-blue-400 to-purple-500',
    bgGradient: 'bg-gradient-to-br from-blue-500/10 to-purple-500/5',
  },
  '505': {
    title: 'HTTP Version Not Supported',
    titleFA: 'ورژن HTTP پشتیبانی نمی‌شود',
    message: 'The HTTP version is not supported.',
    messageFA: 'ورژن HTTP استفاده‌شده پشتیبانی نمی‌شود.',
    icon: '📡',
    accentColor: 'from-red-400 to-pink-500',
    bgGradient: 'bg-gradient-to-br from-red-500/10 to-pink-500/5',
  },
  '506': {
    title: 'Variant Also Negotiates',
    titleFA: 'واریانت نیز مذاکره می‌کند',
    message: 'Server configuration error detected.',
    messageFA: 'خطای پیکربندی سرور شناسایی شد.',
    icon: '⚙️',
    accentColor: 'from-slate-400 to-red-500',
    bgGradient: 'bg-gradient-to-br from-slate-500/10 to-red-500/5',
  },
  '507': {
    title: 'Insufficient Storage',
    titleFA: 'فضای ذخیره‌سازی ناکافی',
    message: 'The server ran out of storage space.',
    messageFA: 'فضای ذخیره‌سازی سرور تمام شد.',
    icon: '💾',
    accentColor: 'from-amber-400 to-orange-500',
    bgGradient: 'bg-gradient-to-br from-amber-500/10 to-orange-500/5',
  },
  '508': {
    title: 'Loop Detected',
    titleFA: 'حلقه شناسایی شد',
    message: 'Infinite loop detected in server request.',
    messageFA: 'حلقه بی‌نهایت در درخواست سرور شناسایی شد.',
    icon: '🔁',
    accentColor: 'from-purple-400 to-pink-500',
    bgGradient: 'bg-gradient-to-br from-purple-500/10 to-pink-500/5',
  },
  '510': {
    title: 'Not Extended',
    titleFA: 'توسعه یافته نیست',
    message: 'Further extensions to the request are required.',
    messageFA: 'توسعه‌های بیشتری برای درخواست لازم است.',
    icon: '🚫',
    accentColor: 'from-red-400 to-red-600',
    bgGradient: 'bg-gradient-to-br from-red-500/10 to-red-600/5',
  },
  '511': {
    title: 'Network Authentication Required',
    titleFA: 'احراز هویت شبکه لازم است',
    message: 'Network authentication is required to proceed.',
    messageFA: 'احراز هویت شبکه برای ادامه لازم است.',
    icon: '🔐',
    accentColor: 'from-cyan-400 to-blue-500',
    bgGradient: 'bg-gradient-to-br from-cyan-500/10 to-blue-500/5',
  },
};

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6 },
  },
};

interface ErrorDisplayProps {
  statusCode: string;
}

export default function ErrorDisplay({ statusCode }: ErrorDisplayProps) {
  const config = errorConfigs[statusCode] || errorConfigs['500'];

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Main Card with Accent Background */}
      <div className={`relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl transition-all duration-300 hover:border-white/20`}>
        {/* Gradient Background Based on Error Type */}
        <div className={`absolute inset-0 ${config.bgGradient} pointer-events-none`} />

        {/* Accent Line Top */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${config.accentColor}`} />

        {/* Content Container */}
        <div className="relative z-10 p-8 md:p-12 space-y-8">
          {/* Icon Section with Enhanced Animation */}
          <motion.div
            className="flex justify-center"
            variants={iconVariants}
          >
            <motion.div
              className="relative"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className="text-8xl md:text-9xl filter drop-shadow-lg">
                <ErrorIcon statusCode={statusCode} />
              </div>
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${config.accentColor} blur-3xl opacity-30 -z-10 animate-pulse`} />
            </motion.div>
          </motion.div>

          {/* Status Code & Title Section */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className={`h-0.5 w-12 bg-gradient-to-r ${config.accentColor}`} />
              <span className="text-xs font-mono font-semibold tracking-wider text-white/50 uppercase">
                HTTP {statusCode}
              </span>
              <div className={`h-0.5 w-12 bg-gradient-to-l ${config.accentColor}`} />
            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              <span className={`bg-gradient-to-r ${config.accentColor} bg-clip-text text-transparent font-black`}>
                {config.titleFA}
              </span>
            </h1>

            <p className="text-base md:text-lg text-white/70 font-medium">
              {config.title}
            </p>
          </motion.div>

          {/* Messages Section */}
          <motion.div variants={itemVariants} className="space-y-4 pt-4 md:pt-6">
            <p className="text-xl md:text-2xl text-white font-semibold leading-relaxed">
              {config.messageFA}
            </p>
            <p className="text-sm md:text-base text-white/60 leading-relaxed font-medium">
              {config.message}
            </p>
          </motion.div>

          {/* Maintenance Status Card */}
          <motion.div
            variants={itemVariants}
            className={`relative overflow-hidden rounded-xl border border-white/10 ${config.bgGradient} p-6 md:p-8 backdrop-blur-sm`}
          >
            <div className="relative z-10 flex items-start gap-4">
              <div className={`text-3xl md:text-4xl flex-shrink-0 animate-bounce`}>🔧</div>
              <div className="flex-1 space-y-2">
                <p className="text-lg md:text-xl font-bold text-white">
                  سایت در دست تعمیر است
                </p>
                <p className="text-sm text-white/60 font-medium">
                  Website is undergoing maintenance. We'll be back online shortly.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
