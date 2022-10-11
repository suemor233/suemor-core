import { Controller, Get } from '@nestjs/common';
import { ApiName } from '~/common/decorator/openapi.decorator';
import { ArchiveService } from './archive.service';

@Controller('archive')
@ApiName
export class ArchiveController {
  constructor(private readonly archiveService: ArchiveService) {}

  @Get()
  async getAllArchivel() {
    return this.archiveService.getAllArchive();
  }
}
