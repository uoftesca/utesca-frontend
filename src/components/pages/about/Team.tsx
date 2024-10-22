'use client';

import { parse } from 'csv-parse/sync';
import { useEffect, useState } from 'react';

import { Portfolio } from './Portfolio';

interface TeamMember {
    imageUrl: string;
    name: string;
    program: string;
    role: string;
}

const file = '/exec-team.csv';

export default function Team() {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

    useEffect(() => {
        async function fetchTeamMembers() {
            try {
                const response = await fetch(file);
                const csvData = await response.text();
                const parsedData = parse(csvData, {
                    columns: true,
                    skip_empty_lines: true,
                });
                setTeamMembers(parsedData);
            } catch (error) {
                console.error('Error fetching team members:', error);
            }
        }

        fetchTeamMembers();
    }, []);

    return (
        <div className='container mx-auto'>
            <div className='flex flex-wrap justify-center justify-items-center gap-6 max-w-xl mx-auto'>
                {teamMembers.map((member, index) => (
                    <div key={index} className='w-auto'>
                        <Portfolio
                            name={member.name}
                            role={member.role}
                            program={member.program}
                            imageUrl={member.imageUrl}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
