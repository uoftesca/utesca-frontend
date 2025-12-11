'use client';

import { useEffect, useState } from 'react';

import { Portfolio } from './Portfolio';

interface TeamMember {
    imageUrl: string;
    name: string;
    program: string;
    role: string;
    team?: string;
}

const file = '/about/exec-team.csv';

export default function Team() {
    const [teamGroups, setTeamGroups] = useState<Record<string, TeamMember[]>>(
        {}
    );

    useEffect(() => {
        async function fetchTeamMembers() {
            try {
                const response = await fetch(file);
                const csvData = await response.text();

                const lines = csvData.split('\n');
                let currentTeam = '';
                const groups: Record<string, TeamMember[]> = {};

                // Skip the header line
                for (let i = 1; i < lines.length; i++) {
                    const line = lines[i].trim();

                    if (line.startsWith('#')) {
                        currentTeam = line.substring(2).trim();
                        groups[currentTeam] = [];
                    } else if (line && currentTeam) {
                        const matches = line.match(
                            /(?:^|,)("(?:[^"]|"")*"|[^,]*)/g
                        );
                        if (matches) {
                            const fields = matches
                                .map((field) =>
                                    field.startsWith(',')
                                        ? field.slice(1)
                                        : field
                                )
                                .map((field) =>
                                    field.startsWith('"') && field.endsWith('"')
                                        ? field.slice(1, -1)
                                        : field
                                );

                            const [name, role, program, imageUrl] = fields;

                            if (name && role && program) {
                                groups[currentTeam].push({
                                    name,
                                    role,
                                    program,
                                    imageUrl: imageUrl || '',
                                });
                            }
                        }
                    }
                }

                setTeamGroups(groups);
            } catch (error) {
                console.error('Error fetching team members:', error);
            }
        }

        fetchTeamMembers();
    }, []);

    return (
        <div className='container mx-auto'>
            {Object.entries(teamGroups).map(([teamName, members]) => (
                <div key={teamName} className='mb-8'>
                    <h2 className='text-2xl font-bold text-primary mb-4'>
                        {teamName}
                    </h2>
                    <div className='flex flex-wrap justify-center justify-items-center gap-6 max-w-xl mx-auto'>
                        {members.map((member) => (
                            <div
                                key={member.name
                                    .toLowerCase()
                                    .replace(/\s+/g, '-')}
                                className='w-auto'
                            >
                                <Portfolio
                                    name={member.name}
                                    role={member.role}
                                    program={member.program}
                                    imageUrl={member.imageUrl || ''}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
