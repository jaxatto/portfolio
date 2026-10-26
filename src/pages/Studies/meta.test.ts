import { describe, expect, it } from 'vitest';
import { studyLinks } from '#constants/studyLinks';
import actblue from './pages/ActBlue/meta';
import indeed from './pages/Indeed/meta';
import servicenow from './pages/ServiceNow/meta';
import toyota from './pages/Toyota/meta';

const metas = [actblue, indeed, servicenow, toyota];

describe('study meta', () => {
  it('has one entry per study link, each on its own path', () => {
    expect(metas.map((m) => m.linkUrl).sort()).toEqual(Object.values(studyLinks).sort());
  });

  it.each(metas.map((m) => [m.linkUrl, m] as const))('%s fits search and copy rules', (_, m) => {
    expect(m.title).toMatch(/\| Jax Engel$/);
    expect(m.description.length).toBeLessThanOrEqual(160);
    expect(`${m.title} ${m.description}`).not.toMatch(/[—;]/);
  });
});
