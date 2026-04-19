"use client";

import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/lib/theme-context";

export interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  background?: string;
  action?: string;
  gradient?: string;
  onClick?: () => void;
  id?: string;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  action,
  gradient,
  onClick,
}: FeatureCardProps) {
  const { currentTheme } = useTheme();
  const isDarkTheme = currentTheme === 'clean-modern';

  // Theme-aware styles
  const cardBg = isDarkTheme
    ? 'bg-slate-800/50 border-slate-700/50 hover:border-sky-500/30'
    : 'bg-white/80 border-gray-200/50 hover:border-primary/30';
  const textPrimary = isDarkTheme ? 'text-white' : 'text-gray-900';
  const textSecondary = isDarkTheme ? 'text-slate-300' : 'text-gray-600';

  return (
    <motion.div
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
      }}
      className="h-full group cursor-pointer"
      onClick={onClick}
    >
      <Card className={`relative overflow-hidden ${cardBg} backdrop-blur-sm rounded-2xl shadow-sm border p-6 text-left transition-all duration-300 hover:shadow-xl h-full`}>
        {/* Glow effect on hover */}
        <motion.div
          className={`absolute -inset-px rounded-2xl bg-gradient-to-r ${isDarkTheme ? 'from-sky-500/20 via-teal-500/20 to-sky-500/20' : 'from-primary/20 via-accent/20 to-primary/20'} opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 -z-10`}
        />

        {/* Shine sweep effect on hover */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
          />
        </div>

        <CardContent className="relative z-10 flex flex-col gap-4 h-full p-0">
          {/* Icon with gradient background */}
          <motion.div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${gradient || 'bg-gradient-to-br from-primary to-accent'} relative`}
            whileHover={{
              scale: 1.1,
              rotate: 5,
            }}
          >
            <Icon className="w-6 h-6 text-white relative z-10" />
          </motion.div>

          {/* Title */}
          <h3 className={`text-lg font-bold ${textPrimary} group-hover:text-primary transition-colors duration-300`}>
            {title}
          </h3>

          {/* Description */}
          <p className={`${textSecondary} text-sm leading-relaxed flex-1`}>
            {description}
          </p>

          {/* Action button */}
          {action && (
            <motion.div
              className={`flex items-center gap-1 ${isDarkTheme ? 'text-sky-400' : 'text-primary'} font-semibold text-sm mt-2`}
              initial={{ opacity: 0.7 }}
              whileHover={{ opacity: 1 }}
            >
              <span>{action}</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// StatCard component for dashboard stats
export function StatCard({
  value,
  label,
  icon: Icon,
  trend,
}: {
  value: string | number;
  label: string;
  icon?: LucideIcon;
  trend?: string;
}) {
  const { currentTheme } = useTheme();
  const isDarkTheme = currentTheme === 'clean-modern';

  const cardBg = isDarkTheme
    ? 'bg-slate-800/50 border-slate-700/50'
    : 'bg-white/80 border-gray-200/50';
  const textPrimary = isDarkTheme ? 'text-white' : 'text-gray-900';
  const textSecondary = isDarkTheme ? 'text-slate-400' : 'text-gray-500';
  const iconBg = isDarkTheme ? 'bg-sky-500/20 text-sky-400' : 'bg-primary/10 text-primary';
  const trendColor = isDarkTheme ? 'text-emerald-400' : 'text-green-600';

  return (
    <Card className={`p-6 rounded-xl shadow-sm ${cardBg} backdrop-blur-sm border`}>
      <CardContent className="flex items-center gap-4 p-0">
        {Icon && (
          <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${iconBg}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
        <div className="flex-1">
          <div className={`text-2xl font-bold ${textPrimary}`}>{value}</div>
          <div className={`text-sm font-medium ${textSecondary}`}>{label}</div>
        </div>
        {trend && (
          <div className={`text-xs font-medium ${trendColor}`}>
            {trend}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
