import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { STAGE_COLORS } from '../data/pipelineData';

export default function PipelineChart({ data }) {
  return (
    <div style={{ width: '100%', height: 220 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 5, left: -15, bottom: 50 }}
          barGap={1}
          barCategoryGap="20%"
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5E5" />
          <XAxis
            dataKey="stage"
            tick={{ fontSize: 9, fill: '#666' }}
            tickLine={false}
            axisLine={{ stroke: '#E5E5E5' }}
            angle={-45}
            textAnchor="end"
            interval={0}
          />
          <YAxis
            tick={{ fontSize: 10, fill: '#666' }}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #E5E5E5',
              borderRadius: '4px',
              fontSize: '12px',
            }}
          />
          <Bar
            dataKey="internal"
            name="Internal"
            fill="#9E0000"
            radius={[2, 2, 0, 0]}
          />
          <Bar
            dataKey="external"
            name="External"
            fill="#0F68B2"
            radius={[2, 2, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
