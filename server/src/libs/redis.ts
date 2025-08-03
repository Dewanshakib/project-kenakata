import { createClient } from 'redis';

export const redis = createClient({
  url: process.env.UPSTASH_REDIS_REST_URL!,
});

if (!redis.isOpen) {
  redis.connect().catch(console.error);
}
