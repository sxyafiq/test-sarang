'use client'

import { Separator } from '@/components/ui/separator';
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts'

interface BarGraphProps {
    data: Graph[]
}

interface Graph {
    data: number;
    year: number;
    month: number;
    ss: number;
}

function getMonthName(month: number) {
    const monthNames = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];

    return monthNames[month - 1];
}

const BarGraph = ({data}: BarGraphProps) => {

    const updatedArray = data.map(obj => {
        const monthName = getMonthName(obj.month);
        const monthYearCombination = `${monthName} ${obj.year}`;

        return {
            ...obj,
            month: monthName,
            monthYear: monthYearCombination
        };
    });

  return (
    <ResponsiveContainer width='100%' height='100%'>
        <BarChart
            width={1000}
            height={100}
            data={updatedArray}
        >
            <CartesianGrid strokeDasharray='3 3'/>
            <XAxis 
                dataKey='monthYear'
                allowDataOverflow={false}
                interval={0} // display all of values, instead of the default 5
                angle={-90} // force text to be 90, reading towards the graph
                textAnchor="end" // rather than setting "dy={50}" or something
                height={150}
                padding={{left: 20, right: 20}}

            />
            <YAxis interval={0} allowDecimals={false} />
            {/* @ts-ignore */}
            <Tooltip content={<CustomTooltip />}/>
            <Bar dataKey='data' fill='rgb(190 242 100)' />
            <Bar dataKey='ss' fill='rgb(96 165 250)' />
        </BarChart>
    </ResponsiveContainer>
  )
}

export default BarGraph

{/* @ts-ignore */}
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className='p-4 bg-slate-50 flex flex-col gap-2 rounded-md'>
                <div>
                    <p className='text-lg pb-1'>{label}</p>
                    <Separator />
                </div>
                <div>
                    <p className='text-sm text-blue-400'>
                        Total Enquiries: 
                        <span className='ml-2'>{payload[0].value}</span>
                    </p>
                    <p className='text-sm text-blue-400'>
                        Sarang Sayang Enquiries: 
                        <span className='ml-2'>{payload[1].value}</span>
                    </p>
                </div>
            </div>
        )
    }
}