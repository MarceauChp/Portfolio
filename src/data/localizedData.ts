import type { Profile, Project, SkillsData, ExperienceItem } from '../types';
import { profileData as profileDataFr } from './profileData';
import { profileDataEn } from './en/profileData.en';
import { profileDataJa } from './ja/profileData.ja';
import { profileDataKo } from './ko/profileData.ko';
import { profileDataZh } from './zh/profileData.zh';

import { projectsData as projectsDataFr } from './projectsData';
import { projectsDataEn } from './en/projectsData.en';
import { projectsDataJa } from './ja/projectsData.ja';
import { projectsDataKo } from './ko/projectsData.ko';
import { projectsDataZh } from './zh/projectsData.zh';

import { skillsData as skillsDataFr } from './skillsData';
import { skillsDataEn } from './en/skillsData.en';
import { skillsDataJa } from './ja/skillsData.ja';
import { skillsDataKo } from './ko/skillsData.ko';
import { skillsDataZh } from './zh/skillsData.zh';

import { experienceData as experienceDataFr } from './experienceData';
import { experienceDataEn } from './en/experienceData.en';
import { experienceDataJa } from './ja/experienceData.ja';
import { experienceDataKo } from './ko/experienceData.ko';
import { experienceDataZh } from './zh/experienceData.zh';

import { mapProjects as mapProjectsFr, CLIPPY_WELCOME as clippyWelcomeFr, type MapProject } from './mapProjectsData';
import { mapProjectsEn, CLIPPY_WELCOME_EN as clippyWelcomeEn } from './en/mapProjectsData.en';
import { mapProjectsJa, CLIPPY_WELCOME_JA as clippyWelcomeJa } from './ja/mapProjectsData.ja';
import { mapProjectsKo, CLIPPY_WELCOME_KO as clippyWelcomeKo } from './ko/mapProjectsData.ko';
import { mapProjectsZh, CLIPPY_WELCOME_ZH as clippyWelcomeZh } from './zh/mapProjectsData.zh';

export function getProfileData(lang: string = 'fr'): Profile {
  if (lang.startsWith('en')) return profileDataEn;
  if (lang.startsWith('ja')) return profileDataJa;
  if (lang.startsWith('ko')) return profileDataKo;
  if (lang.startsWith('zh')) return profileDataZh;
  return profileDataFr;
}

export function getProjectsData(lang: string = 'fr'): Project[] {
  if (lang.startsWith('en')) return projectsDataEn;
  if (lang.startsWith('ja')) return projectsDataJa;
  if (lang.startsWith('ko')) return projectsDataKo;
  if (lang.startsWith('zh')) return projectsDataZh;
  return projectsDataFr;
}

export function getProjectBySlug(slug: string | undefined, lang: string = 'fr'): Project | undefined {
  if (!slug) return undefined;
  const list = getProjectsData(lang);
  return list.find((p) => p.slug === slug);
}

export function getSkillsData(lang: string = 'fr'): SkillsData {
  if (lang.startsWith('en')) return skillsDataEn;
  if (lang.startsWith('ja')) return skillsDataJa;
  if (lang.startsWith('ko')) return skillsDataKo;
  if (lang.startsWith('zh')) return skillsDataZh;
  return skillsDataFr;
}

export function getExperienceData(lang: string = 'fr'): ExperienceItem[] {
  if (lang.startsWith('en')) return experienceDataEn;
  if (lang.startsWith('ja')) return experienceDataJa;
  if (lang.startsWith('ko')) return experienceDataKo;
  if (lang.startsWith('zh')) return experienceDataZh;
  return experienceDataFr;
}

export function getMapProjectsData(lang: string = 'fr'): MapProject[] {
  if (lang.startsWith('en')) return mapProjectsEn;
  if (lang.startsWith('ja')) return mapProjectsJa;
  if (lang.startsWith('ko')) return mapProjectsKo;
  if (lang.startsWith('zh')) return mapProjectsZh;
  return mapProjectsFr;
}

export function getClippyWelcome(lang: string = 'fr'): string {
  if (lang.startsWith('en')) return clippyWelcomeEn;
  if (lang.startsWith('ja')) return clippyWelcomeJa;
  if (lang.startsWith('ko')) return clippyWelcomeKo;
  if (lang.startsWith('zh')) return clippyWelcomeZh;
  return clippyWelcomeFr;
}
