export const Colors = {
  primary: '#2563EB',
  secondary: '#F59E0B',
  success: '#F59E0B',
  error: '#EF4444',
  background: '#f9fafb',
  surface: '#ffffff',
  text: '#111827',
  muted: '#6B7280',
  border: '#E5E7EB',
  shadow: 'rgba(0,0,0,0.08)',
};

export const Layout = {
  radius: 14,
  smallRadius: 10,
  padding: 16,
  gap: 12,
  cardPadding: 14,
};

export const Shadows = {
  card: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 6,
  },
  soft: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
};

export const Typography = {
  title: {
    fontSize: 22,
    fontWeight: '700' as const,
    color: Colors.text,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: Colors.muted,
  },
  body: {
    fontSize: 16,
    color: Colors.text,
  },
  small: {
    fontSize: 12,
    color: Colors.muted,
  },
};

export const Gradient = {
  start: '#3B82F6' + '1A', // blue-500/10
  end: '#F3F4F6', // gray-100
};
