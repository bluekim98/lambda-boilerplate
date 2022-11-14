import { DataSource, EntityManager, EntityTarget, Repository } from 'typeorm';

export abstract class BaseSqlService<E extends Record<string, any>> {
    readonly repository: Repository<E>;
    constructor(
        private readonly target: EntityTarget<E>,
        private readonly connection: DataSource,
    ) {
        this.repository = connection.getRepository(target);
    }

    by(manager?: EntityManager): Repository<E> {
        if (!manager) return this.repository;
        return manager.getRepository(this.target);
    }

    async transaction<T = any>(
        run: (manager: EntityManager) => Promise<T>,
    ): Promise<T> {
        return await this.repository.manager.transaction(run);
    }
}
