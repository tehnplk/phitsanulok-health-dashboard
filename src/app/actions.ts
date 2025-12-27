'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
// (Deprecated) Actions removed: resetSampleData, regenerateWaitingAndVisits
