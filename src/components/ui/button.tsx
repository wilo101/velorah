/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp ref={ref as never} className={className} {...props} />;
  },
);
Button.displayName = 'Button';
