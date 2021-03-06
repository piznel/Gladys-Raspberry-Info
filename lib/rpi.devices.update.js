const rpi = require('./rpi.rpi.js');
const shared = require('./rpi.shared.js')

module.exports = function() {
  return setInterval(function() {
    return deviceUpdate();
  }, parseInt(shared.frequency) * 60 * 1000);
}

function deviceUpdate() {
  let cpuTempId = 'CPU_TEMP';
  let gpuTempId = 'GPU_TEMP';
  let cpuVoltageId = 'CPU_VOLTAGE';
  let cpuUsageId = 'CPU_USAGE';
  let service = 'rpi-info';
  let stateCpu = { value: rpi.temperature.cpu };
  let stateGpu = { value: rpi.temperature.gpu };
  let stateVoltage = { value: rpi.voltageCpu };
  let statCpuUsage = { value: rpi.cpuUsage };

  shared.core.temp_cpu = stateCpu.value;
  shared.core.temp_gpu = stateGpu.value;
  shared.core.voltage = stateVoltage.value;
  shared.core.usage = statCpuUsage.value;

  gladys.deviceState.createByDeviceTypeIdentifier(cpuTempId, service, stateCpu)
    .catch(function(err) {
      sails.log.error(err)
    });

  gladys.deviceState.createByDeviceTypeIdentifier(gpuTempId, service, stateGpu)
    .catch(function(err) {
      sails.log.error(err)
    });

  gladys.deviceState.createByDeviceTypeIdentifier(cpuVoltageId, service, stateVoltage)
    .catch(function(err) {
      csails.log.error(err)
    });

  gladys.deviceState.createByDeviceTypeIdentifier(cpuUsageId, service, statCpuUsage)
    .catch(function(err) {
      sails.log.error(err)
    });
}