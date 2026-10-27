import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProjectCard } from '../Components/ProjectCard/ProjectCard';
import { PortfolioProjects } from '../Data/PortfolioData';

function renderProject(index: number) {
  const project = PortfolioProjects[index];
  render(<MemoryRouter><ProjectCard project={project} index={index} /></MemoryRouter>);
  return project;
}

describe('ProjectCard — portfolio links', () => {
  it('links the case study and live demo to separate destinations', () => {
    const project = renderProject(0);
    expect(screen.getByRole('link', { name: /Explorar solución.*Blend Burger/ })).toHaveAttribute('href', `/projects/${project.id}`);
    expect(screen.getByRole('link', { name: /Ver sitio/i })).toHaveAttribute('href', project.live);
  });

  it('shows a descriptive category on the project card', () => {
    renderProject(1);
    expect(screen.getByText('Aula Studio')).toBeInTheDocument();
    expect(screen.getByText('Academia de formación')).toBeInTheDocument();
  });

  it('only shows a source-code link if the repository is known', () => {
    renderProject(0);
    expect(screen.queryByRole('link', { name: /Ver código/i })).not.toBeInTheDocument();
  });

  it('keeps the GitHub link independent when a repository exists', () => {
    const project = renderProject(1);
    expect(screen.getByRole('link', { name: /Ver código: Aula Studio/i })).toHaveAttribute('href', project.repo);
  });
});
