import { cache } from 'react'

interface AuthInfo {
  account: string;
  timestamp: number;
}

class GlobalAuthorizationTickets {
  private tickets: Map<string, AuthInfo>;

  constructor() {
    this.tickets = new Map<string, AuthInfo>();
  }

  set(ticket: string, info: AuthInfo): void {
    this.tickets.set(ticket, info);
  }

  get(ticket: string): AuthInfo | undefined {
    return this.tickets.get(ticket);
  }

  delete(ticket: string): boolean {
    return this.tickets.delete(ticket);
  }

  // 可选：添加一个清理过期代码的方法
  cleanup(expirationTime: number): void {
    const now = Date.now();
    for (const [ticket, info] of this.tickets.entries()) {
      if (now - info.timestamp > expirationTime) {
        this.tickets.delete(ticket);
      }
    }
  }
}

export const getGlobalAuthorizationTickets = cache(() => new GlobalAuthorizationTickets());

