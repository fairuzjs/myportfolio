/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image?: string;
  images?: string[];
  color: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  text: string;
  timestamp: number;
}
